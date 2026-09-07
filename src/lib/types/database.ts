import type { CreatorStatus } from "@/lib/constants";

export type CreatorRow = {
  id: string;
  created_at: string;
  updated_at: string;
  full_name: string;
  email: string;
  phone: string | null;
  instagram_username: string | null;
  tiktok_username: string | null;
  location: string;
  location_other: string | null;
  content_types: string[];
  preferred_business_types: string[];
  bio: string | null;
  instagram_followers: number | null;
  tiktok_followers: number | null;
  primary_platform: string | null;
  content_link_1: string | null;
  content_link_2: string | null;
  portfolio_url: string | null;
  collaboration_frequency: string | null;
  complimentary_experience: string | null;
  why_join: string | null;
  status: CreatorStatus;
  consent: boolean;
  commitment_ack: boolean;
  admin_notes: string | null;
  reviewed_at: string | null;
};

export type CreatorInsert = Omit<
  CreatorRow,
  "id" | "created_at" | "updated_at" | "admin_notes" | "reviewed_at" | "status"
> & {
  status?: CreatorStatus;
};

export type CreatorUpdate = Partial<
  Pick<CreatorRow, "status" | "admin_notes" | "reviewed_at">
>;

export type AdminUserRow = {
  user_id: string;
  email: string | null;
  created_at: string;
};

/** Hand-written subset of the generated Supabase types — enough for typed queries. */
export type Database = {
  public: {
    Tables: {
      creators: {
        Row: CreatorRow;
        Insert: CreatorInsert;
        Update: CreatorUpdate;
        Relationships: [];
      };
      admin_users: {
        Row: AdminUserRow;
        Insert: AdminUserRow;
        Update: Partial<AdminUserRow>;
        Relationships: [];
      };
    };
    Views: Record<never, never>;
    Functions: {
      is_admin: { Args: Record<never, never>; Returns: boolean };
    };
    Enums: Record<never, never>;
    CompositeTypes: Record<never, never>;
  };
};
