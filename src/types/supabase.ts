export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      progress: {
        Row: {
          created_at: string
          listen: boolean
          progress_id: string
          repeat: boolean
          updated_at: string | null
          user_id: string
          version_id: string
          write: boolean
        }
        Insert: {
          created_at?: string
          listen?: boolean
          progress_id: string
          repeat?: boolean
          updated_at?: string | null
          user_id: string
          version_id: string
          write?: boolean
        }
        Update: {
          created_at?: string
          listen?: boolean
          progress_id?: string
          repeat?: boolean
          updated_at?: string | null
          user_id?: string
          version_id?: string
          write?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "progress_version_id_fkey"
            columns: ["version_id"]
            isOneToOne: false
            referencedRelation: "versions"
            referencedColumns: ["version_id"]
          },
        ]
      }
      settings: {
        Row: {
          created_at: string
          id: string
          language: string
          test_setting: boolean | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          language?: string
          test_setting?: boolean | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          language?: string
          test_setting?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "settings_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      stories: {
        Row: {
          created_at: string
          description: string
          level: Database["public"]["Enums"]["level"]
          public: boolean
          slug: string
          story_id: string
          title: string
          translations: Json
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          description: string
          level?: Database["public"]["Enums"]["level"]
          public?: boolean
          slug: string
          story_id?: string
          title: string
          translations: Json
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          description?: string
          level?: Database["public"]["Enums"]["level"]
          public?: boolean
          slug?: string
          story_id?: string
          title?: string
          translations?: Json
          updated_at?: string | null
        }
        Relationships: []
      }
      versions: {
        Row: {
          created_at: string
          phrases: Json
          reader: string
          story_id: string
          text: string
          time: number
          updated_at: string | null
          version_dialect: string
          version_id: string
          word_count: number
        }
        Insert: {
          created_at?: string
          phrases: Json
          reader: string
          story_id: string
          text: string
          time: number
          updated_at?: string | null
          version_dialect: string
          version_id?: string
          word_count: number
        }
        Update: {
          created_at?: string
          phrases?: Json
          reader?: string
          story_id?: string
          text?: string
          time?: number
          updated_at?: string | null
          version_dialect?: string
          version_id?: string
          word_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "versions_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "stories"
            referencedColumns: ["story_id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      level: "lett" | "ganske-tungt" | "hardt"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
