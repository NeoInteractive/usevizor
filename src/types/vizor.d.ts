export interface MatchData {
  id: string;
  team_two: Team;
  scoreboard: Scoreboard;
  team_one: Team;
  subheading: string;
  status: string;
  created_at: CreatedAt;
  heading: string;
  owner: string;
}
export interface Team {
  color_hex: string;
  score: number;
  icon: string;
  show_icon: boolean;
  name: string;
  color: string;
}
export interface Scoreboard {
  show_subheading: boolean;
  premium: boolean;
  dark: boolean;
  show_heading: boolean;
  theme: string;
  sponsors: boolean;
}
export interface CreatedAt {
  seconds: number;
  nanoseconds: number;
}
