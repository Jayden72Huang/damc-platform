import {
  integer,
  jsonb,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

// NextAuth v5 schema (compatible with @auth/drizzle-adapter)

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
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

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => [primaryKey({ columns: [vt.identifier, vt.token] })]
);

// DAMC reports

export const reports = pgTable("reports", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
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

  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
});

export type Report = typeof reports.$inferSelect;
export type NewReport = typeof reports.$inferInsert;

// DAMC Skills marketplace

export const skills = pgTable("skills", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  reportSlug: text("report_slug").references(() => reports.slug, { onDelete: "set null" }),

  name: text("name").notNull(),
  displayName: text("display_name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull().default("other"),
  price: integer("price").notNull().default(0),
  currency: text("currency").notNull().default("USD"),
  installCommand: text("install_command").notNull().default(""),
  repoUrl: text("repo_url"),
  demoUrl: text("demo_url"),
  iconEmoji: text("icon_emoji"),
  tags: jsonb("tags"),
  features: jsonb("features"),
  stats: jsonb("stats"),
  valuation: jsonb("valuation"),
  visibility: text("visibility").notNull().default("public"), // public | premium
  status: text("status").notNull().default("draft"),          // draft | published | listed
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
});

export type Skill = typeof skills.$inferSelect;
export type NewSkill = typeof skills.$inferInsert;
