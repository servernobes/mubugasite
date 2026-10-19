// Auto-generated types for the database schema.
// Re-generate with: npx supabase gen types typescript --project-id YOUR_PROJECT_ID

export type Database = {
  public: {
    Tables: {
      news_articles: {
        Row: {
          id: string;
          slug: string;
          category: string;
          title: string;
          excerpt: string;
          body: string;
          cover_url: string | null;
          published: boolean;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["news_articles"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["news_articles"]["Insert"]>;
      };
      staff_members: {
        Row: {
          id: string;
          name: string;
          role: string;
          bio: string;
          photo_url: string | null;
          sort_order: number;
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["staff_members"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["staff_members"]["Insert"]>;
      };
      board_members: {
        Row: {
          id: string;
          name: string;
          role: string;
          group_type: "board" | "management";
          photo_url: string | null;
          confirmed: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["board_members"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["board_members"]["Insert"]>;
      };
      gallery_images: {
        Row: {
          id: string;
          storage_url: string;
          alt_text: string;
          caption: string | null;
          section: string;
          sort_order: number;
          published: boolean;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["gallery_images"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["gallery_images"]["Insert"]>;
      };
      site_settings: {
        Row: {
          key: string;
          value: string;
          label: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["site_settings"]["Row"], "updated_at">;
        Update: Partial<Database["public"]["Tables"]["site_settings"]["Insert"]>;
      };
    };
  };
};

// Convenience row types
export type NewsArticle  = Database["public"]["Tables"]["news_articles"]["Row"];
export type StaffMember  = Database["public"]["Tables"]["staff_members"]["Row"];
export type BoardMember  = Database["public"]["Tables"]["board_members"]["Row"];
export type GalleryImage = Database["public"]["Tables"]["gallery_images"]["Row"];
export type SiteSetting  = Database["public"]["Tables"]["site_settings"]["Row"];
