export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      action_plan_items: {
        Row: {
          application_id: string
          created_at: string
          id: string
          is_done: boolean
          kind: string
          sort_order: number
          title_en: string
          title_hi: string
          url: string | null
          user_id: string
        }
        Insert: {
          application_id: string
          created_at?: string
          id?: string
          is_done?: boolean
          kind?: string
          sort_order?: number
          title_en: string
          title_hi: string
          url?: string | null
          user_id: string
        }
        Update: {
          application_id?: string
          created_at?: string
          id?: string
          is_done?: boolean
          kind?: string
          sort_order?: number
          title_en?: string
          title_hi?: string
          url?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "action_plan_items_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      applications: {
        Row: {
          created_at: string
          id: string
          notes: string | null
          scheme_id: string
          stage: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          notes?: string | null
          scheme_id: string
          stage?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          notes?: string | null
          scheme_id?: string
          stage?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "applications_scheme_id_fkey"
            columns: ["scheme_id"]
            isOneToOne: false
            referencedRelation: "schemes"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_history: {
        Row: {
          content: string
          created_at: string
          id: string
          role: string
          scheme_id: string | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          role: string
          scheme_id?: string | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          role?: string
          scheme_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_history_scheme_id_fkey"
            columns: ["scheme_id"]
            isOneToOne: false
            referencedRelation: "schemes"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          is_read: boolean
          kind: string
          message_en: string
          message_hi: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean
          kind?: string
          message_en: string
          message_hi: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean
          kind?: string
          message_en?: string
          message_hi?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          age: number | null
          annual_income: number | null
          area_type: string | null
          benefit_category: string | null
          created_at: string
          district: string | null
          education: string | null
          full_name: string
          gender: string | null
          id: string
          language: string
          occupation: string | null
          onboarded: boolean
          state: string | null
          updated_at: string
        }
        Insert: {
          age?: number | null
          annual_income?: number | null
          area_type?: string | null
          benefit_category?: string | null
          created_at?: string
          district?: string | null
          education?: string | null
          full_name?: string
          gender?: string | null
          id: string
          language?: string
          occupation?: string | null
          onboarded?: boolean
          state?: string | null
          updated_at?: string
        }
        Update: {
          age?: number | null
          annual_income?: number | null
          area_type?: string | null
          benefit_category?: string | null
          created_at?: string
          district?: string | null
          education?: string | null
          full_name?: string
          gender?: string | null
          id?: string
          language?: string
          occupation?: string | null
          onboarded?: boolean
          state?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      scheme_documents: {
        Row: {
          doc_key: string
          id: string
          instructions_en: string
          instructions_hi: string
          name_en: string
          name_hi: string
          scheme_id: string
          sort_order: number
        }
        Insert: {
          doc_key: string
          id?: string
          instructions_en?: string
          instructions_hi?: string
          name_en: string
          name_hi: string
          scheme_id: string
          sort_order?: number
        }
        Update: {
          doc_key?: string
          id?: string
          instructions_en?: string
          instructions_hi?: string
          name_en?: string
          name_hi?: string
          scheme_id?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "scheme_documents_scheme_id_fkey"
            columns: ["scheme_id"]
            isOneToOne: false
            referencedRelation: "schemes"
            referencedColumns: ["id"]
          },
        ]
      }
      schemes: {
        Row: {
          allowed_states: string[]
          application_steps_en: string[]
          application_steps_hi: string[]
          area_type: string | null
          benefits_en: string[]
          benefits_hi: string[]
          category: string
          created_at: string
          details_en: string
          details_hi: string
          education_levels: string[]
          gender: string | null
          id: string
          is_active: boolean
          last_verified: string | null
          max_age: number | null
          max_income: number | null
          min_age: number | null
          ministry_en: string
          ministry_hi: string
          name_en: string
          name_hi: string
          occupations: string[]
          official_application_url: string | null
          official_source_url: string | null
          other_conditions: Json
          short_description_en: string
          short_description_hi: string
          slug: string
          source_name: string | null
          updated_at: string
          url_status: string
        }
        Insert: {
          allowed_states?: string[]
          application_steps_en?: string[]
          application_steps_hi?: string[]
          area_type?: string | null
          benefits_en?: string[]
          benefits_hi?: string[]
          category: string
          created_at?: string
          details_en: string
          details_hi: string
          education_levels?: string[]
          gender?: string | null
          id?: string
          is_active?: boolean
          last_verified?: string | null
          max_age?: number | null
          max_income?: number | null
          min_age?: number | null
          ministry_en: string
          ministry_hi: string
          name_en: string
          name_hi: string
          occupations?: string[]
          official_application_url?: string | null
          official_source_url?: string | null
          other_conditions?: Json
          short_description_en: string
          short_description_hi: string
          slug: string
          source_name?: string | null
          updated_at?: string
          url_status?: string
        }
        Update: {
          allowed_states?: string[]
          application_steps_en?: string[]
          application_steps_hi?: string[]
          area_type?: string | null
          benefits_en?: string[]
          benefits_hi?: string[]
          category?: string
          created_at?: string
          details_en?: string
          details_hi?: string
          education_levels?: string[]
          gender?: string | null
          id?: string
          is_active?: boolean
          last_verified?: string | null
          max_age?: number | null
          max_income?: number | null
          min_age?: number | null
          ministry_en?: string
          ministry_hi?: string
          name_en?: string
          name_hi?: string
          occupations?: string[]
          official_application_url?: string | null
          official_source_url?: string | null
          other_conditions?: Json
          short_description_en?: string
          short_description_hi?: string
          slug?: string
          source_name?: string | null
          updated_at?: string
          url_status?: string
        }
        Relationships: []
      }
      user_documents: {
        Row: {
          created_at: string
          doc_key: string
          extracted_info: string | null
          file_name: string | null
          file_path: string | null
          id: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          doc_key: string
          extracted_info?: string | null
          file_name?: string | null
          file_path?: string | null
          id?: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          doc_key?: string
          extracted_info?: string | null
          file_name?: string | null
          file_path?: string | null
          id?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
