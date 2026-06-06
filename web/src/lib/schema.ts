import {
  pgTable,
  text,
  timestamp,
  integer,
  uuid,
  jsonb,
  primaryKey,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    primaryKey({ columns: [account.provider, account.providerAccountId] }),
  ]
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const reports = pgTable("reports", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").unique().notNull(),
  userId: text("user_id").references(() => users.id, { onDelete: "set null" }),
  scores: jsonb("scores").notNull(),
  archetype: text("archetype").notNull(),
  archetypeEmoji: text("archetype_emoji"),
  archetypeCode: text("archetype_code"),
  overall: integer("overall"),
  role: text("role"),
  mbti: text("mbti"),
  insights: jsonb("insights"),
  scanSummary: jsonb("scan_summary"),
  env: jsonb("env"),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export const skills = pgTable("skills", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").unique().notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  reportSlug: text("report_slug").references(() => reports.slug, {
    onDelete: "set null",
  }),
  name: text("name").notNull(),
  displayName: text("display_name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  price: integer("price").notNull().default(0),
  currency: text("currency").notNull().default("USD"),
  installCommand: text("install_command").notNull(),
  repoUrl: text("repo_url"),
  demoUrl: text("demo_url"),
  iconEmoji: text("icon_emoji"),
  tags: jsonb("tags").$type<string[]>(),
  features: jsonb("features").$type<string[]>(),
  stats: jsonb("stats").$type<{
    downloads: number;
    rating: number;
    reviews: number;
  }>(),
  valuation: jsonb("valuation").$type<{
    score: number;
    reasoning: string;
    marketFit: string;
    uniqueness: string;
  }>(),
  visibility: text("visibility").notNull().default("public"),
  status: text("status").notNull().default("draft"),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

export const teams = pgTable("teams", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").unique().notNull(),
  description: text("description"),
  inviteCode: text("invite_code").unique().notNull(),
  ownerId: text("owner_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export const teamMembers = pgTable(
  "team_members",
  {
    teamId: uuid("team_id")
      .notNull()
      .references(() => teams.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    role: text("role").notNull().default("member"),
    joinedAt: timestamp("joined_at", { mode: "date" }).defaultNow().notNull(),
  },
  (tm) => [primaryKey({ columns: [tm.teamId, tm.userId] })]
);

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  reports: many(reports),
  skills: many(skills),
  teamMemberships: many(teamMembers),
  ownedTeams: many(teams),
}));

export const reportsRelations = relations(reports, ({ one }) => ({
  user: one(users, { fields: [reports.userId], references: [users.id] }),
}));

export const skillsRelations = relations(skills, ({ one }) => ({
  user: one(users, { fields: [skills.userId], references: [users.id] }),
}));

export const teamsRelations = relations(teams, ({ one, many }) => ({
  owner: one(users, { fields: [teams.ownerId], references: [users.id] }),
  members: many(teamMembers),
}));

export const teamMembersRelations = relations(teamMembers, ({ one }) => ({
  team: one(teams, { fields: [teamMembers.teamId], references: [teams.id] }),
  user: one(users, { fields: [teamMembers.userId], references: [users.id] }),
}));

// 表类型导出 — 供页面/组件直接使用
export type Report = typeof reports.$inferSelect;
export type NewReport = typeof reports.$inferInsert;
export type Skill = typeof skills.$inferSelect;
export type NewSkill = typeof skills.$inferInsert;
