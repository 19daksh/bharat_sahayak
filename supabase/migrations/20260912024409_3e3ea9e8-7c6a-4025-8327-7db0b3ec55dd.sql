
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read their own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  full_name text NOT NULL DEFAULT '',
  age integer,
  state text,
  district text,
  occupation text,
  education text,
  annual_income numeric,
  gender text,
  area_type text,
  language text NOT NULL DEFAULT 'en',
  benefit_category text,
  onboarded boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own profile read" ON public.profiles FOR SELECT TO authenticated USING (id = auth.uid());
CREATE POLICY "Own profile insert" ON public.profiles FOR INSERT TO authenticated WITH CHECK (id = auth.uid());
CREATE POLICY "Own profile update" ON public.profiles FOR UPDATE TO authenticated USING (id = auth.uid()) WITH CHECK (id = auth.uid());
CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', ''))
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user') ON CONFLICT DO NOTHING;
  RETURN NEW;
END; $$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE TABLE public.schemes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name_en text NOT NULL,
  name_hi text NOT NULL,
  short_description_en text NOT NULL,
  short_description_hi text NOT NULL,
  details_en text NOT NULL,
  details_hi text NOT NULL,
  category text NOT NULL,
  ministry_en text NOT NULL,
  ministry_hi text NOT NULL,
  benefits_en text[] NOT NULL DEFAULT '{}',
  benefits_hi text[] NOT NULL DEFAULT '{}',
  min_age integer,
  max_age integer,
  max_income numeric,
  allowed_states text[] NOT NULL DEFAULT '{}',
  occupations text[] NOT NULL DEFAULT '{}',
  education_levels text[] NOT NULL DEFAULT '{}',
  gender text,
  area_type text,
  other_conditions jsonb NOT NULL DEFAULT '[]'::jsonb,
  application_steps_en text[] NOT NULL DEFAULT '{}',
  application_steps_hi text[] NOT NULL DEFAULT '{}',
  official_source_url text,
  official_application_url text,
  source_name text,
  last_verified date,
  url_status text NOT NULL DEFAULT 'verified',
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.schemes TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.schemes TO authenticated;
GRANT ALL ON public.schemes TO service_role;
ALTER TABLE public.schemes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read active schemes" ON public.schemes FOR SELECT USING (is_active = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage schemes" ON public.schemes FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER schemes_updated_at BEFORE UPDATE ON public.schemes FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.scheme_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  scheme_id uuid NOT NULL REFERENCES public.schemes ON DELETE CASCADE,
  doc_key text NOT NULL,
  name_en text NOT NULL,
  name_hi text NOT NULL,
  instructions_en text NOT NULL DEFAULT '',
  instructions_hi text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  UNIQUE (scheme_id, doc_key)
);
GRANT SELECT ON public.scheme_documents TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.scheme_documents TO authenticated;
GRANT ALL ON public.scheme_documents TO service_role;
ALTER TABLE public.scheme_documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read scheme documents" ON public.scheme_documents FOR SELECT USING (true);
CREATE POLICY "Admins manage scheme documents" ON public.scheme_documents FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  scheme_id uuid NOT NULL REFERENCES public.schemes ON DELETE CASCADE,
  stage text NOT NULL DEFAULT 'discovered',
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, scheme_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.applications TO authenticated;
GRANT ALL ON public.applications TO service_role;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own applications" ON public.applications FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE TRIGGER applications_updated_at BEFORE UPDATE ON public.applications FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.action_plan_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid NOT NULL REFERENCES public.applications ON DELETE CASCADE,
  user_id uuid NOT NULL,
  title_en text NOT NULL,
  title_hi text NOT NULL,
  kind text NOT NULL DEFAULT 'task',
  url text,
  is_done boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.action_plan_items TO authenticated;
GRANT ALL ON public.action_plan_items TO service_role;
ALTER TABLE public.action_plan_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own action plan" ON public.action_plan_items FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE TABLE public.user_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  doc_key text NOT NULL,
  status text NOT NULL DEFAULT 'missing',
  file_path text,
  file_name text,
  extracted_info text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, doc_key)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_documents TO authenticated;
GRANT ALL ON public.user_documents TO service_role;
ALTER TABLE public.user_documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own documents" ON public.user_documents FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE TRIGGER user_documents_updated_at BEFORE UPDATE ON public.user_documents FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.chat_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role text NOT NULL,
  content text NOT NULL,
  scheme_id uuid REFERENCES public.schemes ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.chat_history TO authenticated;
GRANT ALL ON public.chat_history TO service_role;
ALTER TABLE public.chat_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own chat history" ON public.chat_history FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE TABLE public.notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  kind text NOT NULL DEFAULT 'reminder',
  message_en text NOT NULL,
  message_hi text NOT NULL,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.notifications TO authenticated;
GRANT ALL ON public.notifications TO service_role;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own notifications" ON public.notifications FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users read own citizen documents" ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'citizen-documents' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users upload own citizen documents" ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'citizen-documents' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users update own citizen documents" ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'citizen-documents' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users delete own citizen documents" ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'citizen-documents' AND auth.uid()::text = (storage.foldername(name))[1]);
