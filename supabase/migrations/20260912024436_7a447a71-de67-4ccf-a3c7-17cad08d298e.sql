
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;

DROP POLICY "Anyone can read active schemes" ON public.schemes;
CREATE POLICY "Visitors can read active schemes" ON public.schemes FOR SELECT TO anon USING (is_active = true);
CREATE POLICY "Signed in users can read schemes" ON public.schemes FOR SELECT TO authenticated
USING (is_active = true OR public.has_role(auth.uid(), 'admin'));

REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;
