export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      books: {
        Row: {
          author: string
          created_at: string
          favorite: boolean
          finished: string | null
          id: number
          img: string
          owner: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          author: string
          created_at?: string
          favorite?: boolean
          finished?: string | null
          id?: number
          img: string
          owner: string
          status: string
          title: string
          updated_at?: string
        }
        Update: {
          author?: string
          created_at?: string
          favorite?: boolean
          finished?: string | null
          id?: number
          img?: string
          owner?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "books_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      movies: {
        Row: {
          created_at: string
          favorite: boolean
          id: number
          img: string
          title: string
        }
        Insert: {
          created_at?: string
          favorite: boolean
          id?: number
          img: string
          title: string
        }
        Update: {
          created_at?: string
          favorite?: boolean
          id?: number
          img?: string
          title?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          id: string
          updated_at: string | null
          username: string
        }
        Insert: {
          id: string
          updated_at?: string | null
          username: string
        }
        Update: {
          id?: string
          updated_at?: string | null
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
