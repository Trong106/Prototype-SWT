import type { UserRole } from "./types"

// Mock database interface
interface MockDB {
  users: Array<{
    id: string
    roleId: number
    roleCode: UserRole
    roleName: string
    fullName: string
    email: string
    avatar: string
    isActive: boolean
    specialty?: string
    rating?: number
    hourlyRate?: number
  }>
  series: Array<{
    id: string
    title: string
    titleJp: string
    synopsis: string
    coverImageUrl: string | null
    status: "proposal" | "active" | "hiatus" | "completed" | "cancelled"
    mangakaId: string
    tantouId: string | null
    ranking: number | null
    readerCount: number
    rating: number
    createdAt: string
    updatedAt: string
    genres: string[]
    cancellationReason?: string | null
  }>
  proposals: Array<{
    proposalId: string
    seriesId: string
    title: string
    titleJp: string
    synopsis: string
    coverImageUrl: string | null
    genres: string[]
    status: "pending" | "approved" | "rejected"
    submittedAt: string
    reviewedAt?: string | null
    feedback?: string | null
    authorName: string
  }>
  chapters: Array<{
    chapterId: string
    seriesId: string
    chapterNumber: number
    title: string
    status: "draft" | "in_progress" | "tantou_review" | "approved" | "published"
    dueDate: string | null
    submittedForPublishingAt?: string | null
    tantouReviewNote?: string | null
    updatedAt: string
  }>
  pages: Array<{
    pageId: string
    chapterId: string
    pageNumber: number
    status: "pending" | "assigned" | "in_progress" | "review" | "submitted" | "approved"
    currentImageUrl: string
    uploadedAt: string | null
  }>
  tasks: Array<{
    taskId: string
    title: string
    description: string
    type: "line_art" | "background" | "effects" | "coloring" | "lettering" | "review"
    pageId: string
    regionId?: string | null
    assigneeId?: string | null
    assigneeName?: string | null
    assigneeAvatar?: string | null
    assignerId: string
    status: "pending" | "in_progress" | "submitted" | "revision" | "approved"
    dueDate: string | null
    paymentAmount: number
    createdAt: string
    updatedAt: string
  }>
  pageAnnotations: Array<{
    annotationId: string
    pageId: string
    createdById: string
    x: number
    y: number
    width?: number | null
    height?: number | null
    body: string
    status: "open" | "resolved"
    createdAt: string
  }>
  reviewComments: Array<{
    commentId: string
    pageId: string
    userId: string
    userName: string
    avatar: string
    body: string
    createdAt: string
  }>
  notifications: Array<{
    notificationId: string
    userId: string
    type: "task_assigned" | "task_submitted" | "review_needed" | "payment" | "deadline" | "system"
    title: string
    message: string
    isRead: boolean
    link?: string | null
    createdAt: string
  }>
  payrollRecords: Array<{
    payrollRecordId: string
    assistantId: string
    taskId?: string | null
    periodStart: string
    periodEnd: string
    baseAmount: number
    bonusAmount: number
    deductionAmount: number
    status: "pending" | "processing" | "paid" | "failed"
    paidAt?: string | null
    createdAt: string
  }>
  publishSchedules: Array<{
    publishScheduleId: string
    chapterId: string
    scheduledDate: string
    status: "scheduled" | "published" | "cancelled"
    approvedById?: string | null
    publishedAt?: string | null
    createdAt: string
  }>
  auditLogs: Array<{
    auditLogId: string
    userId: string | null
    action: string
    entityType: string
    entityId: string | null
    detailsJson: string | null
    createdAt: string
  }>
}

const STORAGE_KEY = "mangaflow_mock_db"

// Seed initial data
const getInitialDB = (): MockDB => {
  const mangakaId = "11111111-1111-1111-1111-111111111111"
  const assistantId = "22222222-2222-2222-2222-222222222222"
  const assistantId2 = "22222222-2222-2222-2222-333333333333"
  const assistantId3 = "22222222-2222-2222-2222-444444444444"
  const tantouId = "33333333-3333-3333-3333-333333333333"
  const tantouId2 = "33333333-3333-3333-3333-444444444444"
  const editorialId = "44444444-4444-4444-4444-444444444444"

  const users: MockDB["users"] = [
    { id: mangakaId, roleId: 1, roleCode: "mangaka", roleName: "Mangaka", fullName: "Yuki Tanaka", email: "yuki@mangaflow.com", avatar: "yuki", isActive: true },
    { id: assistantId, roleId: 2, roleCode: "assistant", roleName: "Assistant", fullName: "Kenji Yamamoto", email: "kenji@mangaflow.com", avatar: "kenji", isActive: true, specialty: "Line Art & Backgrounds", rating: 4.8, hourlyRate: 25.0 },
    { id: assistantId2, roleId: 2, roleCode: "assistant", roleName: "Assistant", fullName: "Haruto Sato", email: "haruto@mangaflow.com", avatar: "haruto", isActive: true, specialty: "Effects & Tones", rating: 4.6, hourlyRate: 22.0 },
    { id: assistantId3, roleId: 2, roleCode: "assistant", roleName: "Assistant", fullName: "Mei Takahashi", email: "mei@mangaflow.com", avatar: "mei", isActive: true, specialty: "Coloring & Lettering", rating: 4.9, hourlyRate: 28.0 },
    { id: tantouId, roleId: 3, roleCode: "tantou", roleName: "Tantou Editor", fullName: "Sakura Ito", email: "sakura@mangaflow.com", avatar: "sakura", isActive: true },
    { id: tantouId2, roleId: 3, roleCode: "tantou", roleName: "Tantou Editor", fullName: "Daiki Watanabe", email: "daiki@mangaflow.com", avatar: "daiki", isActive: true },
    { id: editorialId, roleId: 4, roleCode: "editorial", roleName: "Editorial Board", fullName: "Takeshi Sato", email: "takeshi@mangaflow.com", avatar: "takeshi", isActive: true }
  ]

  const seriesId1 = "aaaa1111-aaaa-1111-aaaa-111111111111"
  const seriesId2 = "bbbb2222-bbbb-2222-bbbb-222222222222"
  const seriesId3 = "cccc3333-cccc-3333-cccc-333333333333"
  const seriesId4 = "dddd4444-dddd-4444-dddd-444444444444"
  const seriesId5 = "eeee5555-eeee-5555-eeee-555555555555"
  const seriesId6 = "ffff6666-ffff-6666-ffff-666666666666"
  const seriesId7 = "gggg7777-gggg-7777-gggg-777777777777"
  const seriesId8 = "hhhh8888-hhhh-8888-hhhh-888888888888"

  const series: MockDB["series"] = [
    {
      id: seriesId1,
      title: "Dragon Hunters",
      titleJp: "Ryuu Kari",
      synopsis: "An epic high-fantasy manga following a young orphan who joins a guild of legendary hunters to protect the last remaining human kingdom from colossal ancient drakes.",
      coverImageUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500&auto=format&fit=crop&q=80",
      status: "active",
      mangakaId: mangakaId,
      tantouId: tantouId,
      ranking: 1,
      readerCount: 154200,
      rating: 4.9,
      createdAt: "2026-01-10T08:00:00Z",
      updatedAt: "2026-07-02T18:30:00Z",
      genres: ["Action", "Fantasy", "Adventure"]
    },
    {
      id: seriesId4,
      title: "Cyberpunk Odyssey",
      titleJp: "Cyber Shinobi",
      synopsis: "A cyberpunk thriller set in Neo-Tokyo where a rogue android ninja fights against corrupt megacorporations to uncover the secrets of his lost humanity.",
      coverImageUrl: "https://images.unsplash.com/photo-1563089145-599997674d42?w=500&auto=format&fit=crop&q=80",
      status: "active",
      mangakaId: mangakaId,
      tantouId: tantouId,
      ranking: 2,
      readerCount: 132400,
      rating: 4.8,
      createdAt: "2026-02-01T08:00:00Z",
      updatedAt: "2026-07-02T19:00:00Z",
      genres: ["Sci-Fi", "Action", "Cyberpunk"]
    },
    {
      id: seriesId6,
      title: "Shadow Monarch Reign",
      titleJp: "Kage no O",
      synopsis: "A low-tier hunter obtains a mysterious quest interface that lets him level up infinitely. Soon, he raises a massive shadow army to clean S-rank dungeons.",
      coverImageUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&auto=format&fit=crop&q=80",
      status: "active",
      mangakaId: mangakaId,
      tantouId: tantouId2,
      ranking: 3,
      readerCount: 110800,
      rating: 4.7,
      createdAt: "2026-03-10T08:00:00Z",
      updatedAt: "2026-07-02T20:00:00Z",
      genres: ["Action", "Fantasy", "System"]
    },
    {
      id: seriesId2,
      title: "School Life Romance",
      titleJp: "Kanojo wa Seifuku",
      synopsis: "A heartwarming slice-of-life comedy about a shy student who gets seated next to a quirky, energetic manga lover, leading to a sweet schoolyard romance.",
      coverImageUrl: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&auto=format&fit=crop&q=80",
      status: "active",
      mangakaId: mangakaId,
      tantouId: tantouId,
      ranking: 4,
      readerCount: 89400,
      rating: 4.6,
      createdAt: "2026-02-15T09:00:00Z",
      updatedAt: "2026-07-01T15:20:00Z",
      genres: ["Romance", "Comedy", "School Life"]
    },
    {
      id: seriesId5,
      title: "Slice of Cooking",
      titleJp: "Gourmet Kitchen",
      synopsis: "A gourmet comedy focusing on a Michelin-star chef who opens a small, cozy diner in a residential suburb, transforming simple ingredients into legendary dishes.",
      coverImageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=500&auto=format&fit=crop&q=80",
      status: "active",
      mangakaId: mangakaId,
      tantouId: tantouId2,
      ranking: 7,
      readerCount: 65000,
      rating: 4.5,
      createdAt: "2026-04-01T08:00:00Z",
      updatedAt: "2026-07-02T12:00:00Z",
      genres: ["Comedy", "Slice of Life", "Gourmet"]
    },
    {
      id: seriesId3,
      title: "Dark Fantasy Chronicle",
      titleJp: "Ankoku no Senki",
      synopsis: "A grim dark fantasy chronicle charting a war-torn continent where survivors must fend off corrupt deities and their undead legions using dark sorcery.",
      coverImageUrl: "https://images.unsplash.com/photo-1560942485-b2a11cc13456?w=500&auto=format&fit=crop&q=80",
      status: "hiatus",
      mangakaId: mangakaId,
      tantouId: tantouId,
      ranking: 12,
      readerCount: 32000,
      rating: 4.2,
      createdAt: "2026-03-01T10:00:00Z",
      updatedAt: "2026-06-25T12:00:00Z",
      genres: ["Dark Fantasy", "Drama"]
    },
    {
      id: seriesId7,
      title: "Detective Noir Casebook",
      titleJp: "Kuroi Tantei",
      synopsis: "A cynical detective is dragged into a dangerous web of conspiracy after a mysterious woman hires him to investigate a murder case in a rain-soaked city.",
      coverImageUrl: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=500&auto=format&fit=crop&q=80",
      status: "hiatus",
      mangakaId: mangakaId,
      tantouId: tantouId2,
      ranking: 18,
      readerCount: 18500,
      rating: 4.0,
      createdAt: "2026-01-20T08:00:00Z",
      updatedAt: "2026-06-15T10:00:00Z",
      genres: ["Mystery", "Drama", "Psychological"]
    },
    {
      id: seriesId8,
      title: "Ghost Academy",
      titleJp: "Ghost High School",
      synopsis: "A schoolboy who can see spirits accidentally enrolls in an academy run entirely by ghosts, leading to funny and spooky classroom scenarios.",
      coverImageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=80",
      status: "cancelled",
      mangakaId: mangakaId,
      tantouId: tantouId,
      ranking: null,
      readerCount: 5200,
      rating: 3.5,
      createdAt: "2026-02-20T08:00:00Z",
      updatedAt: "2026-05-10T08:00:00Z",
      genres: ["Supernatural", "School Life", "Comedy"],
      cancellationReason: "Low readership engagement and writer fatigue."
    }
  ]

  const proposals: MockDB["proposals"] = [
    {
      proposalId: "p1111111-p111-1111-p111-111111111111",
      seriesId: "dummy-series-id-1",
      title: "Neon Cyber Ninja",
      titleJp: "Cyber Shinobi",
      synopsis: "A cyberpunk thriller set in Neo-Tokyo where a rogue android ninja fights against corrupt megacorporations to uncover the secrets of his lost humanity.",
      coverImageUrl: "https://images.unsplash.com/photo-1563089145-599997674d42?w=500&auto=format&fit=crop&q=80",
      genres: ["Sci-Fi", "Action", "Cyberpunk"],
      status: "pending",
      submittedAt: "2026-07-01T14:00:00Z",
      authorName: "Yuki Tanaka"
    },
    {
      proposalId: "p2222222-p222-2222-p222-222222222222",
      seriesId: seriesId4,
      title: "Mystery of the Clockwork Island",
      titleJp: "Karakuri Shima",
      synopsis: "A steampunk detective adventure where an eccentric inventor and a royal detective team up to solve a series of mysterious disappearances on a mechanical island.",
      coverImageUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&auto=format&fit=crop&q=80",
      genres: ["Mystery", "Steampunk", "Adventure"],
      status: "approved",
      submittedAt: "2026-06-10T10:00:00Z",
      reviewedAt: "2026-06-12T16:00:00Z",
      feedback: "Great world-building and character designs. Approved for development.",
      authorName: "Yuki Tanaka"
    },
    {
      proposalId: "p3333333-p333-3333-p333-333333333333",
      seriesId: seriesId5,
      title: "Slice of Cooking",
      titleJp: "Gourmet Kitchen",
      synopsis: "A gourmet comedy focusing on a Michelin-star chef who opens a small, cozy diner in a residential suburb.",
      coverImageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=500&auto=format&fit=crop&q=80",
      genres: ["Comedy", "Slice of Life", "Gourmet"],
      status: "approved",
      submittedAt: "2026-03-15T09:00:00Z",
      reviewedAt: "2026-03-20T10:00:00Z",
      feedback: "Unique and relaxing plot. Approved for publication schedule.",
      authorName: "Yuki Tanaka"
    },
    {
      proposalId: "p4444444-p444-4444-p444-444444444444",
      seriesId: "dummy-series-id-5",
      title: "High School Exorcist",
      titleJp: "High School Taimashi",
      synopsis: "A high school boy discovers he belongs to a long line of exorcists and must fight evil spirits in classrooms.",
      coverImageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=80",
      genres: ["Action", "Supernatural", "School Life"],
      status: "rejected",
      submittedAt: "2026-05-01T08:00:00Z",
      reviewedAt: "2026-05-05T09:00:00Z",
      feedback: "Plot feels too generic and identical to current trends. Please rewrite the main concept.",
      authorName: "Yuki Tanaka"
    },
    {
      proposalId: "p5555555-p555-5555-p555-555555555555",
      seriesId: "dummy-series-id-6",
      title: "Space Colonists Chronicles",
      titleJp: "Uchuu Koroni",
      synopsis: "A realistic hard sci-fi chronicle detailing the social conflicts and political struggles on Mars' first human dome colony.",
      coverImageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&auto=format&fit=crop&q=80",
      genres: ["Sci-Fi", "Drama"],
      status: "pending",
      submittedAt: "2026-07-02T16:00:00Z",
      authorName: "Yuki Tanaka"
    }
  ]

  const chapters: MockDB["chapters"] = [
    // Dragon Hunters Chapters
    { chapterId: "c1111111-c111-1111-c111-111111111111", seriesId: seriesId1, chapterNumber: 43, title: "The Dragon's Maw", status: "published", dueDate: "2026-06-15", submittedForPublishingAt: "2026-06-14T10:00:00Z", updatedAt: "2026-06-15T00:00:00Z" },
    { chapterId: "c2222222-c222-2222-c222-222222222222", seriesId: seriesId1, chapterNumber: 44, title: "Blades in the Dark", status: "published", dueDate: "2026-06-25", submittedForPublishingAt: "2026-06-24T09:30:00Z", updatedAt: "2026-06-25T00:00:00Z" },
    { chapterId: "c3333333-c333-3333-c333-333333333333", seriesId: seriesId1, chapterNumber: 45, title: "Awakening of the Drake", status: "tantou_review", dueDate: "2026-07-10", submittedForPublishingAt: "2026-07-02T17:15:00Z", tantouReviewNote: "Needs quick lettering checks on page 3.", updatedAt: "2026-07-02T17:15:00Z" },
    { chapterId: "c4444444-c444-4444-c444-444444444444", seriesId: seriesId1, chapterNumber: 46, title: "A Storm Approaching", status: "in_progress", dueDate: "2026-07-25", updatedAt: "2026-07-02T10:00:00Z" },
    
    // School Life Romance Chapters
    { chapterId: "c5555555-c555-2222-c555-222222222222", seriesId: seriesId2, chapterNumber: 12, title: "A Rainy Afternoon", status: "published", dueDate: "2026-06-20", submittedForPublishingAt: "2026-06-18T14:00:00Z", updatedAt: "2026-06-20T00:00:00Z" },
    { chapterId: "c6666666-c666-2222-c666-222222222222", seriesId: seriesId2, chapterNumber: 13, title: "Confession in the Library", status: "approved", dueDate: "2026-07-05", submittedForPublishingAt: "2026-06-30T16:00:00Z", updatedAt: "2026-06-30T17:00:00Z" },
    { chapterId: "c7777777-c777-2222-c777-222222222222", seriesId: seriesId2, chapterNumber: 14, title: "Summer Festival Date", status: "draft", dueDate: "2026-07-20", updatedAt: "2026-07-02T09:00:00Z" },

    // Cyberpunk Odyssey Chapters
    { chapterId: "c-cyber-1", seriesId: seriesId4, chapterNumber: 1, title: "Zero Protocol", status: "published", dueDate: "2026-06-28", submittedForPublishingAt: "2026-06-27T08:00:00Z", updatedAt: "2026-06-28T00:00:00Z" },
    { chapterId: "c-cyber-2", seriesId: seriesId4, chapterNumber: 2, title: "Gridrunner", status: "tantou_review", dueDate: "2026-07-12", submittedForPublishingAt: "2026-07-02T21:00:00Z", updatedAt: "2026-07-02T21:00:00Z" },
    { chapterId: "c-cyber-3", seriesId: seriesId4, chapterNumber: 3, title: "Neon Override", status: "in_progress", dueDate: "2026-07-28", updatedAt: "2026-07-02T10:00:00Z" },

    // Slice of Cooking Chapters
    { chapterId: "c-cook-1", seriesId: seriesId5, chapterNumber: 1, title: "The Secret Spice", status: "published", dueDate: "2026-06-30", submittedForPublishingAt: "2026-06-28T10:00:00Z", updatedAt: "2026-06-30T00:00:00Z" },
    { chapterId: "c-cook-2", seriesId: seriesId5, chapterNumber: 2, title: "Diner Opening Night", status: "approved", dueDate: "2026-07-15", submittedForPublishingAt: "2026-07-01T15:00:00Z", updatedAt: "2026-07-01T16:00:00Z" },

    // Shadow Monarch Reign Chapters
    { chapterId: "c-shadow-1", seriesId: seriesId6, chapterNumber: 1, title: "The Weakest Hunter", status: "published", dueDate: "2026-06-10", submittedForPublishingAt: "2026-06-08T09:00:00Z", updatedAt: "2026-06-10T00:00:00Z" },
    { chapterId: "c-shadow-2", seriesId: seriesId6, chapterNumber: 2, title: "Double Dungeon Trials", status: "published", dueDate: "2026-06-24", submittedForPublishingAt: "2026-06-22T09:30:00Z", updatedAt: "2026-06-24T00:00:00Z" },
    { chapterId: "c-shadow-3", seriesId: seriesId6, chapterNumber: 3, title: "Arise Shadow Soldiers", status: "tantou_review", dueDate: "2026-07-08", submittedForPublishingAt: "2026-07-02T22:00:00Z", updatedAt: "2026-07-02T22:00:00Z" }
  ]

  const pages: MockDB["pages"] = [
    // Pages for Dragon Hunters Ch 45 (In Review)
    { pageId: "page-45-1", chapterId: "c3333333-c333-3333-c333-333333333333", pageNumber: 1, status: "approved", currentImageUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80", uploadedAt: "2026-07-02T15:00:00Z" },
    { pageId: "page-45-2", chapterId: "c3333333-c333-3333-c333-333333333333", pageNumber: 2, status: "approved", currentImageUrl: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=600&auto=format&fit=crop&q=80", uploadedAt: "2026-07-02T15:10:00Z" },
    { pageId: "page-45-3", chapterId: "c3333333-c333-3333-c333-333333333333", pageNumber: 3, status: "review", currentImageUrl: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=600&auto=format&fit=crop&q=80", uploadedAt: "2026-07-02T15:20:00Z" },
    { pageId: "page-45-4", chapterId: "c3333333-c333-3333-c333-333333333333", pageNumber: 4, status: "submitted", currentImageUrl: "https://images.unsplash.com/photo-1601987077677-5346c0c57d3f?w=600&auto=format&fit=crop&q=80", uploadedAt: "2026-07-02T16:00:00Z" },
    
    // Pages for Dragon Hunters Ch 46 (In Progress)
    { pageId: "page-46-1", chapterId: "c4444444-c444-4444-c444-444444444444", pageNumber: 1, status: "in_progress", currentImageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80", uploadedAt: "2026-07-02T10:00:00Z" },
    { pageId: "page-46-2", chapterId: "c4444444-c444-4444-c444-444444444444", pageNumber: 2, status: "pending", currentImageUrl: "https://images.unsplash.com/photo-1618005198143-e528346ddfcd?w=600&auto=format&fit=crop&q=80", uploadedAt: null },

    // Pages for Cyberpunk Odyssey Ch 2 (Tantou Review)
    { pageId: "page-cyber-2-1", chapterId: "c-cyber-2", pageNumber: 1, status: "approved", currentImageUrl: "https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80", uploadedAt: "2026-07-02T20:00:00Z" },
    { pageId: "page-cyber-2-2", chapterId: "c-cyber-2", pageNumber: 2, status: "review", currentImageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80", uploadedAt: "2026-07-02T20:30:00Z" },
    { pageId: "page-cyber-2-3", chapterId: "c-cyber-2", pageNumber: 3, status: "submitted", currentImageUrl: "https://images.unsplash.com/photo-1601987077677-5346c0c57d3f?w=600&auto=format&fit=crop&q=80", uploadedAt: "2026-07-02T21:00:00Z" },

    // Pages for Shadow Monarch Reign Ch 3 (Tantou Review)
    { pageId: "page-shadow-3-1", chapterId: "c-shadow-3", pageNumber: 1, status: "review", currentImageUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80", uploadedAt: "2026-07-02T21:30:00Z" },
    { pageId: "page-shadow-3-2", chapterId: "c-shadow-3", pageNumber: 2, status: "submitted", currentImageUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80", uploadedAt: "2026-07-02T22:00:00Z" }
  ]

  const tasks: MockDB["tasks"] = [
    // Dragon Hunters Tasks
    {
      taskId: "t1111111-t111-1111-t111-111111111111",
      title: "Draw background forest - Ch 46 Page 1",
      description: "Draw the dense ancient forest backdrop with large roots and light rays filtering through. Refer to the storyboard folder for perspective.",
      type: "background",
      pageId: "page-46-1",
      regionId: "region-1",
      assigneeId: assistantId,
      assigneeName: "Kenji Yamamoto",
      assigneeAvatar: "kenji",
      assignerId: mangakaId,
      status: "in_progress",
      dueDate: "2026-07-08",
      paymentAmount: 85.0,
      createdAt: "2026-07-02T10:15:00Z",
      updatedAt: "2026-07-02T10:15:00Z"
    },
    {
      taskId: "t2222222-t222-2222-t222-222222222222",
      title: "Ink character lines - Ch 46 Page 1",
      description: "Ink Yuki's outline on Panel 2 and 3. Keep line weights crisp.",
      type: "line_art",
      pageId: "page-46-1",
      regionId: null,
      assigneeId: assistantId,
      assigneeName: "Kenji Yamamoto",
      assigneeAvatar: "kenji",
      assignerId: mangakaId,
      status: "approved",
      dueDate: "2026-07-05",
      paymentAmount: 120.0,
      createdAt: "2026-07-02T10:00:00Z",
      updatedAt: "2026-07-02T16:30:00Z"
    },
    {
      taskId: "t3333333-t333-3333-t333-333333333333",
      title: "Lettering dialogue - Ch 46 Page 2",
      description: "Add dialogues on page 2. Script is in the chapter folder.",
      type: "lettering",
      pageId: "page-46-2",
      regionId: null,
      assigneeId: null,
      assigneeName: "Unassigned",
      assigneeAvatar: null,
      assignerId: mangakaId,
      status: "pending",
      dueDate: "2026-07-15",
      paymentAmount: 40.0,
      createdAt: "2026-07-02T11:00:00Z",
      updatedAt: "2026-07-02T11:00:00Z"
    },

    // Cyberpunk Tasks
    {
      taskId: "t-cyber-task-1",
      title: "Neon City Coloring - Ch 2 Page 1",
      description: "Apply neon lights, signs, and night gradients to City Plaza panel on Page 1.",
      type: "coloring",
      pageId: "page-cyber-2-2",
      regionId: "region-cyber-1",
      assigneeId: assistantId3,
      assigneeName: "Mei Takahashi",
      assigneeAvatar: "mei",
      assignerId: mangakaId,
      status: "in_progress",
      dueDate: "2026-07-10",
      paymentAmount: 95.0,
      createdAt: "2026-07-02T18:00:00Z",
      updatedAt: "2026-07-02T18:00:00Z"
    },
    {
      taskId: "t-cyber-task-2",
      title: "Hologram glitch effects - Ch 2 Page 2",
      description: "Add glitch line patterns, particle sparks, and holographic opacity layers.",
      type: "effects",
      pageId: "page-cyber-2-2",
      regionId: null,
      assigneeId: assistantId2,
      assigneeName: "Haruto Sato",
      assigneeAvatar: "haruto",
      assignerId: mangakaId,
      status: "submitted",
      dueDate: "2026-07-07",
      paymentAmount: 75.0,
      createdAt: "2026-07-02T18:15:00Z",
      updatedAt: "2026-07-02T22:30:00Z"
    },
    {
      taskId: "t-cyber-task-3",
      title: "Ninja Action Line Art - Ch 2 Page 1",
      description: "Ink the dynamic poses of ninja mid-air on Panel 4.",
      type: "line_art",
      pageId: "page-cyber-2-1",
      regionId: null,
      assigneeId: assistantId,
      assigneeName: "Kenji Yamamoto",
      assigneeAvatar: "kenji",
      assignerId: mangakaId,
      status: "approved",
      dueDate: "2026-07-06",
      paymentAmount: 130.0,
      createdAt: "2026-07-02T17:00:00Z",
      updatedAt: "2026-07-02T20:00:00Z"
    },

    // Shadow Monarch Tasks
    {
      taskId: "t-shadow-task-1",
      title: "Shadow Soldiers Glow - Ch 3 Page 1",
      description: "Add the mystical purple shadow vapor effects rising from soldiers' armor.",
      type: "effects",
      pageId: "page-shadow-3-1",
      regionId: null,
      assigneeId: assistantId2,
      assigneeName: "Haruto Sato",
      assigneeAvatar: "haruto",
      assignerId: mangakaId,
      status: "approved",
      dueDate: "2026-07-06",
      paymentAmount: 90.0,
      createdAt: "2026-07-02T19:00:00Z",
      updatedAt: "2026-07-02T21:30:00Z"
    },
    {
      taskId: "t-shadow-task-2",
      title: "Shadow Sovereign Armor Coloring - Ch 3 Page 1",
      description: "Base color the dark armor layers, hair strands, and weapon glows.",
      type: "coloring",
      pageId: "page-shadow-3-1",
      regionId: null,
      assigneeId: assistantId3,
      assigneeName: "Mei Takahashi",
      assigneeAvatar: "mei",
      assignerId: mangakaId,
      status: "approved",
      dueDate: "2026-07-06",
      paymentAmount: 110.0,
      createdAt: "2026-07-02T19:15:00Z",
      updatedAt: "2026-07-02T21:40:00Z"
    },
    {
      taskId: "t-shadow-task-3",
      title: "SFX Lettering - Ch 3 Page 2",
      description: "Add heavy metal clash sound effects and action lettering in English.",
      type: "lettering",
      pageId: "page-shadow-3-2",
      regionId: null,
      assigneeId: assistantId3,
      assigneeName: "Mei Takahashi",
      assigneeAvatar: "mei",
      assignerId: mangakaId,
      status: "submitted",
      dueDate: "2026-07-07",
      paymentAmount: 50.0,
      createdAt: "2026-07-02T20:00:00Z",
      updatedAt: "2026-07-02T22:00:00Z"
    },
    {
      taskId: "t-shadow-task-4",
      title: "Speech Bubble Overlay - Ch 45 Page 3",
      description: "Adjust speech bubble boundaries and lettering spacing on panel 2.",
      type: "lettering",
      pageId: "page-45-3",
      regionId: null,
      assigneeId: assistantId,
      assigneeName: "Kenji Yamamoto",
      assigneeAvatar: "kenji",
      assignerId: mangakaId,
      status: "revision",
      dueDate: "2026-07-06",
      paymentAmount: 35.0,
      createdAt: "2026-07-02T17:40:00Z",
      updatedAt: "2026-07-02T17:45:00Z"
    }
  ]

  const pageAnnotations: MockDB["pageAnnotations"] = [
    {
      annotationId: "a1111111-a111-1111-a111-111111111111",
      pageId: "page-45-3",
      createdById: tantouId,
      x: 35.5,
      y: 42.0,
      width: 25,
      height: 12,
      body: "Text in this speech bubble is clipped. Please resize the text or adjust the bubble boundary.",
      status: "open",
      createdAt: "2026-07-02T17:30:00Z"
    },
    {
      annotationId: "a-cyber-annot",
      pageId: "page-cyber-2-2",
      createdById: tantouId,
      x: 55.0,
      y: 30.5,
      width: 20,
      height: 20,
      body: "Increase neon glow brightness on this billboard panel to enhance atmospheric lighting.",
      status: "open",
      createdAt: "2026-07-02T20:45:00Z"
    }
  ]

  const reviewComments: MockDB["reviewComments"] = [
    {
      commentId: "comment-1",
      pageId: "page-45-3",
      userId: tantouId,
      userName: "Sakura Ito",
      avatar: "sakura",
      body: "Overall the ink work is amazing. Just please fix the text issue marked in the annotation.",
      createdAt: "2026-07-02T17:35:00Z"
    },
    {
      commentId: "comment-cyber",
      pageId: "page-cyber-2-2",
      userId: tantouId,
      userName: "Sakura Ito",
      avatar: "sakura",
      body: "Make the glow feel vibrant. The storyboard is fantastic.",
      createdAt: "2026-07-02T20:50:00Z"
    }
  ]

  const notifications: MockDB["notifications"] = [
    {
      notificationId: "n1111111-n111-1111-n111-111111111111",
      userId: mangakaId,
      type: "review_needed",
      title: "Review Required",
      message: "Tantou Sakura Ito has review remarks on Chapter 45, Page 3.",
      isRead: false,
      link: "/review",
      createdAt: "2026-07-02T17:36:00Z"
    },
    {
      notificationId: "n2222222-n222-2222-n222-222222222222",
      userId: assistantId,
      type: "task_assigned",
      title: "New Task Assigned",
      message: "Yuki Tanaka assigned task 'Draw background forest - Ch 46 Page 1' to you.",
      isRead: false,
      link: "/tasks",
      createdAt: "2026-07-02T10:16:00Z"
    },
    {
      notificationId: "n3",
      userId: assistantId3,
      type: "task_assigned",
      title: "New Task Assigned",
      message: "Yuki Tanaka assigned task 'Neon City Coloring - Ch 2 Page 1' to you.",
      isRead: false,
      link: "/tasks",
      createdAt: "2026-07-02T18:05:00Z"
    },
    {
      notificationId: "n4",
      userId: assistantId2,
      type: "task_assigned",
      title: "New Task Assigned",
      message: "Yuki Tanaka assigned task 'Hologram glitch effects - Ch 2 Page 2' to you.",
      isRead: false,
      link: "/tasks",
      createdAt: "2026-07-02T18:20:00Z"
    },
    {
      notificationId: "n5",
      userId: assistantId,
      type: "payment",
      title: "Payroll Settled",
      message: "Your billing for period June 15 - June 30 has been successfully processed and paid.",
      isRead: true,
      link: "/payroll",
      createdAt: "2026-07-01T08:05:00Z"
    },
    {
      notificationId: "n6",
      userId: mangakaId,
      type: "deadline",
      title: "Approaching Deadline",
      message: "Dragon Hunters Chapter 45 publishing date is approaching in 7 days.",
      isRead: false,
      link: "/schedule",
      createdAt: "2026-07-03T08:00:00Z"
    }
  ]

  const payrollRecords: MockDB["payrollRecords"] = [
    { payrollRecordId: "pay-1", assistantId: assistantId, taskId: "t2222222-t222-2222-t222-222222222222", periodStart: "2026-06-15", periodEnd: "2026-06-30", baseAmount: 350.00, bonusAmount: 50.00, deductionAmount: 0.00, status: "paid", paidAt: "2026-07-01T08:00:00Z", createdAt: "2026-06-30T18:00:00Z" },
    { payrollRecordId: "pay-2", assistantId: assistantId, taskId: null, periodStart: "2026-07-01", periodEnd: "2026-07-15", baseAmount: 120.00, bonusAmount: 0.00, deductionAmount: 0.00, status: "pending", createdAt: "2026-07-02T23:00:00Z" },
    { payrollRecordId: "pay-3", assistantId: assistantId3, taskId: "t-cyber-task-3", periodStart: "2026-06-15", periodEnd: "2026-06-30", baseAmount: 420.00, bonusAmount: 30.00, deductionAmount: 0.00, status: "paid", paidAt: "2026-07-01T08:00:00Z", createdAt: "2026-06-30T18:00:00Z" },
    { payrollRecordId: "pay-4", assistantId: assistantId3, taskId: null, periodStart: "2026-07-01", periodEnd: "2026-07-15", baseAmount: 160.00, bonusAmount: 0.00, deductionAmount: 0.00, status: "pending", createdAt: "2026-07-02T23:05:00Z" },
    { payrollRecordId: "pay-5", assistantId: assistantId2, taskId: "t-shadow-task-1", periodStart: "2026-06-15", periodEnd: "2026-06-30", baseAmount: 220.00, bonusAmount: 0.00, deductionAmount: 10.00, status: "paid", paidAt: "2026-07-01T08:00:00Z", createdAt: "2026-06-30T18:00:00Z" },
    { payrollRecordId: "pay-6", assistantId: assistantId2, taskId: null, periodStart: "2026-07-01", periodEnd: "2026-07-15", baseAmount: 75.00, bonusAmount: 15.00, deductionAmount: 0.00, status: "processing", createdAt: "2026-07-02T23:10:00Z" }
  ]

  const publishSchedules: MockDB["publishSchedules"] = [
    { publishScheduleId: "s1111111-s111-1111-s111-111111111111", chapterId: "c5555555-c555-2222-c555-222222222222", scheduledDate: "2026-06-20T09:00:00Z", status: "published", approvedById: editorialId, publishedAt: "2026-06-20T09:00:00Z", createdAt: "2026-06-18T15:00:00Z" },
    { publishScheduleId: "s2222222-s222-2222-s222-222222222222", chapterId: "c6666666-c666-2222-c666-222222222222", scheduledDate: "2026-07-05T09:00:00Z", status: "scheduled", approvedById: editorialId, createdAt: "2026-06-30T17:30:00Z" },
    { publishScheduleId: "s3", chapterId: "c-cyber-1", scheduledDate: "2026-06-28T09:00:00Z", status: "published", approvedById: editorialId, publishedAt: "2026-06-28T09:00:00Z", createdAt: "2026-06-26T14:00:00Z" },
    { publishScheduleId: "s4", chapterId: "c-cyber-2", scheduledDate: "2026-07-12T09:00:00Z", status: "scheduled", approvedById: editorialId, createdAt: "2026-07-02T21:10:00Z" },
    { publishScheduleId: "s5", chapterId: "c-shadow-2", scheduledDate: "2026-06-24T09:00:00Z", status: "published", approvedById: editorialId, publishedAt: "2026-06-24T09:00:00Z", createdAt: "2026-06-22T10:00:00Z" }
  ]

  const auditLogs: MockDB["auditLogs"] = [
    { auditLogId: "log-1", userId: mangakaId, action: "Create Chapter", entityType: "Chapter", entityId: "c4444444-c444-4444-c444-444444444444", detailsJson: '{"title":"A Storm Approaching","chapterNumber":46}', createdAt: "2026-07-02T10:00:00Z" },
    { auditLogId: "log-2", userId: assistantId, action: "Submit Task", entityType: "Task", entityId: "t2222222-t222-2222-t222-222222222222", detailsJson: '{"title":"Ink character lines","payment":120}', createdAt: "2026-07-02T16:30:00Z" },
    { auditLogId: "log-3", userId: tantouId, action: "Add Annotation", entityType: "Page", entityId: "page-45-3", detailsJson: '{"issue":"Speech bubble clip"}', createdAt: "2026-07-02T17:30:00Z" },
    { auditLogId: "log-4", userId: mangakaId, action: "Assign Task", entityType: "Task", entityId: "t-cyber-task-1", detailsJson: '{"title":"Neon City Coloring","assignee":"Mei Takahashi"}', createdAt: "2026-07-02T18:00:00Z" },
    { auditLogId: "log-5", userId: editorialId, action: "Approve Proposal", entityType: "Proposal", entityId: "p2222222-p222-2222-p222-222222222222", detailsJson: '{"title":"Mystery of the Clockwork Island"}', createdAt: "2026-06-12T16:00:00Z" },
    { auditLogId: "log-6", userId: tantouId2, action: "Approve Chapter", entityType: "Chapter", entityId: "c-cook-2", detailsJson: '{"title":"Diner Opening Night"}', createdAt: "2026-07-01T16:00:00Z" }
  ]

  return {
    users,
    series,
    proposals,
    chapters,
    pages,
    tasks,
    pageAnnotations,
    reviewComments,
    notifications,
    payrollRecords,
    publishSchedules,
    auditLogs
  }
}

// Fetch database state from localStorage or seed it if empty
function loadDB(): MockDB {
  if (typeof window === "undefined") return getInitialDB()
  const val = localStorage.getItem(STORAGE_KEY)
  if (val) {
    try {
      const db = JSON.parse(val) as MockDB
      if (db.series && db.series.find(s => s.id === "dddd4444-dddd-4444-dddd-444444444444")) {
        return db
      }
    } catch {
      // JSON corruption fallback
    }
  }
  const initial = getInitialDB()
  saveDB(initial)
  return initial
}


function saveDB(db: MockDB) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db))
  }
}

// Helpers to read query parameters
function parseQueryParams(url: string): Record<string, string> {
  const params: Record<string, string> = {}
  try {
    const urlObj = new URL(url)
    urlObj.searchParams.forEach((val, key) => {
      params[key] = val
    })
  } catch {
    // Relative URL fallback
    const match = url.match(/\?([^#]*)/)
    if (match && match[1]) {
      match[1].split("&").forEach((part) => {
        const [k, v] = part.split("=")
        if (k) params[decodeURIComponent(k)] = decodeURIComponent(v || "")
      })
    }
  }
  return params
}

// Global fetch interceptor router
export async function handleMockRequest(url: string, init?: RequestInit): Promise<{ status: number; body: any } | null> {
  const method = init?.method?.toUpperCase() || "GET"
  const db = loadDB()
  const urlParams = parseQueryParams(url)
  
  // Extract path endpoint (remove protocol/domain and query params)
  const path = url.split("?")[0].replace(/^https?:\/\/[^\/]+/, "")
  
  // Helper to extract JWT token to simulate current user id
  const authHeader = init?.headers ? (init.headers as any)["Authorization"] || "" : ""
  const token = authHeader.replace("Bearer ", "")
  let loggedUserId = "11111111-1111-1111-1111-111111111111" // Default Yuki (Mangaka)
  if (token && token.startsWith("mock_token_")) {
    const role = token.replace("mock_token_", "")
    const matchedUser = db.users.find(u => u.roleCode === role)
    if (matchedUser) {
      loggedUserId = matchedUser.id
    }
  }

  // 1. POST /api/auth/login
  if (path === "/api/auth/login" && method === "POST") {
    const body = JSON.parse(init?.body as string || "{}")
    const email = body.email || ""
    const matchedUser = db.users.find(u => u.email.toLowerCase() === email.toLowerCase())
    if (matchedUser) {
      return {
        status: 200,
        body: {
          token: `mock_token_${matchedUser.roleCode}`,
          role: matchedUser.roleCode.toUpperCase(),
          userId: matchedUser.id,
          email: matchedUser.email,
          fullName: matchedUser.fullName
        }
      }
    }
    return { status: 400, body: { error: "Invalid credentials" } }
  }
  // 1b. GET /api/mangaka/series
  if (path === "/api/mangaka/series" && method === "GET") {
    const mangakaId = urlParams.mangakaId || loggedUserId
    const result = db.series.filter(s => s.mangakaId === mangakaId).map(s => ({
      id: s.id,
      title: s.title,
      titleJp: s.titleJp,
      synopsis: s.synopsis,
      coverImageUrl: s.coverImageUrl,
      status: s.status,
      genres: s.genres
    }))
    return { status: 200, body: result }
  }

  // 2. GET /api/data/series
  if (path === "/api/data/series" && method === "GET") {

    // Format response matching ASP.NET controller
    const result = db.series.map(s => {
      const authorObj = db.users.find(u => u.id === s.mangakaId)
      const chaps = db.chapters.filter(c => c.seriesId === s.id)
      const pageIds = db.pages.filter(p => chaps.map(c => c.chapterId).includes(p.chapterId)).map(p => p.pageId)
      const seriesTasks = db.tasks.filter(t => pageIds.includes(t.pageId))
      
      const distinctTeam = seriesTasks
        .filter(t => t.assigneeName)
        .map(t => t.assigneeName!)
        .filter((val, i, arr) => arr.indexOf(val) === i)

      const approvedCount = seriesTasks.filter(t => t.status === "approved").length
      const progress = seriesTasks.length > 0 
        ? Math.round((approvedCount / seriesTasks.length) * 100)
        : 0

      return {
        id: s.id,
        title: s.title,
        titleJp: s.titleJp,
        author: authorObj?.fullName || "Yuki Tanaka",
        createdAt: new Date(s.createdAt).toLocaleDateString("vi-VN"),
        createdAtRaw: s.createdAt,
        updatedAtRaw: s.updatedAt,
        genre: s.genres.join(" / ") || "General",
        genres: s.genres,
        chapters: chaps.length,
        status: s.status,
        starred: s.ranking !== null && s.ranking <= 3,
        ranking: s.ranking,
        rating: s.rating,
        readerCount: s.readerCount,
        revenue: s.readerCount * 0.15,
        coverImageUrl: s.coverImageUrl,
        synopsis: s.synopsis,
        team: distinctTeam,
        progress: s.status === "completed" ? 100 : progress
      }
    })
    return { status: 200, body: result }
  }

  // 3. GET /api/data/dashboard-metrics
  if (path === "/api/data/dashboard-metrics" && method === "GET") {
    const roleParam = (urlParams.role || "mangaka").toLowerCase()
    
    if (roleParam === "mangaka") {
      const activeSeries = db.series.filter(s => s.mangakaId === loggedUserId && s.status === "active").length
      const activeTasks = db.tasks.filter(t => t.assignerId === loggedUserId && t.assigneeId)
      const assistants = activeTasks.map(t => t.assigneeId).filter((v, i, a) => a.indexOf(v) === i).length
      const pagesCount = db.pages.length
      return {
        status: 200,
        body: [
          { title: "Active Series", val: activeSeries.toString(), change: `${activeSeries} currently running`, icon: "📚" },
          { title: "Team Members", val: assistants.toString(), change: `${assistants} assistants active`, icon: "👥" },
          { title: "Pages Uploaded", val: pagesCount.toString(), change: "Across all active chapters", icon: "📄" }
        ]
      }
    } else if (roleParam === "assistant") {
      const assigned = db.tasks.filter(t => t.assigneeId === loggedUserId && (t.status === "pending" || t.status === "in_progress")).length
      const completed = db.tasks.filter(t => t.assigneeId === loggedUserId && t.status === "approved").length
      const earned = completed * 85 // Mock payment calculation
      return {
        status: 200,
        body: [
          { title: "Assigned Tasks", val: assigned.toString(), change: "Pending your input", icon: "📋" },
          { title: "Completed Tasks", val: completed.toString(), change: "Successfully approved", icon: "✅" },
          { title: "Earned Payroll", val: `$${earned}`, change: "This billing cycle", icon: "💰" }
        ]
      }
    } else if (roleParam === "tantou") {
      const reviewPages = db.pages.filter(p => p.status === "review" || p.status === "submitted").length
      const reviewQueue = db.chapters.filter(c => c.status === "tantou_review").length
      return {
        status: 200,
        body: [
          { title: "Pages to Review", val: reviewPages.toString(), change: "Requires annotation check", icon: "👀" },
          { title: "Chapters in Queue", val: reviewQueue.toString(), change: "Awaiting publish approval", icon: "🚀" },
          { title: "Studio Progress", val: "85%", change: "Chapter 45 in review", icon: "📉" }
        ]
      }
    } else if (roleParam === "editorial") {
      const pendingProposals = db.proposals.filter(p => p.status === "pending").length
      const totalSeries = db.series.length
      return {
        status: 200,
        body: [
          { title: "New Proposals", val: pendingProposals.toString(), change: "Pending approval", icon: "⚖️" },
          { title: "Active Projects", val: totalSeries.toString(), change: "Across all departments", icon: "📚" },
          { title: "Global Ranking", val: "Top 3", change: "Dragon Hunters leading", icon: "🏆" }
        ]
      }
    }
  }

  // 4. GET /api/data/audit-logs
  if (path === "/api/data/audit-logs" && method === "GET") {
    const result = db.auditLogs.map(l => {
      const userObj = db.users.find(u => u.id === l.userId)
      let category: "series" | "chapter" | "user" | "system" | "payment" = "system"
      if (l.entityType === "Series" || l.entityType === "Proposal") {
        category = "series"
      } else if (l.entityType === "Chapter" || l.entityType === "Page" || l.entityType === "Task") {
        category = "chapter"
      } else if (l.entityType === "User") {
        category = "user"
      } else if (l.entityType === "Payment") {
        category = "payment"
      }

      return {
        id: l.auditLogId,
        user: {
          name: userObj?.fullName || "System",
          avatar: userObj?.avatar || "system",
          role: userObj?.roleName || "Automated"
        },
        action: l.action,
        entityType: l.entityType,
        entityName: l.entityId ? `${l.entityType} (ID: ${l.entityId.substring(0, 8)})` : l.entityType,
        details: l.detailsJson || "No details available.",
        timestamp: l.createdAt,
        category: category
      }
    })
    return { status: 200, body: result }
  }

  // 5. GET /api/data/reader-votes
  if (path === "/api/data/reader-votes" && method === "GET") {
    // Generate mock votes list
    const week = Number(urlParams.week) || 27
    const year = Number(urlParams.year) || 2026
    const mockVotes = db.series.map((s, idx) => {
      const baseVotes = s.readerCount ? Math.round(s.readerCount / 4) : 10000
      const weekVotes = Math.round(baseVotes * (1 + Math.sin(week + idx) * 0.1))
      const prevVotes = Math.round(baseVotes * (1 + Math.sin(week - 1 + idx) * 0.15))
      return {
        id: `vote-${s.id}-${week}`,
        seriesId: s.id,
        series: s.title,
        votes: weekVotes,
        previousVotes: prevVotes,
        change: weekVotes - prevVotes,
        rank: idx + 1,
        previousRank: idx === 0 ? 2 : idx === 1 ? 1 : idx + 1
      }
    })
    return { status: 200, body: mockVotes }
  }

  // 6. POST /api/data/reader-votes
  if (path === "/api/data/reader-votes" && method === "POST") {
    // Just simulate successful saving of reader votes
    const body = JSON.parse(init?.body as string || "{}")
    // Log audit log
    const newLog = {
      auditLogId: `log-${Date.now()}`,
      userId: loggedUserId,
      action: "Save Reader Votes",
      entityType: "ReaderVotes",
      entityId: null,
      detailsJson: JSON.stringify({ week: body.weekNumber, year: body.yearNumber }),
      createdAt: new Date().toISOString()
    }
    db.auditLogs.unshift(newLog)
    saveDB(db)
    return { status: 200, body: { success: true } }
  }

  // 7. GET /api/publish-schedule or /api/publish-schedules
  if ((path === "/api/publish-schedule" || path === "/api/publish-schedules") && method === "GET") {
    const result = db.publishSchedules.map(s => {
      const chap = db.chapters.find(c => c.chapterId === s.chapterId)
      const ser = db.series.find(sr => sr.id === chap?.seriesId)
      const authorObj = ser ? db.users.find(u => u.id === ser.mangakaId) : null
      return {
        scheduleId: s.publishScheduleId,
        chapterId: s.chapterId,
        chapterNumber: chap?.chapterNumber || 0,
        chapterTitle: chap?.title || null,
        seriesTitle: ser?.title || "Unknown Series",
        scheduledDate: s.scheduledDate,
        status: s.status,
        approvedById: s.approvedById || null,
        approvedByName: s.approvedById ? "Takeshi Sato" : null,
        publishedAt: s.publishedAt || null,
        createdAt: s.createdAt,
        coverImageUrl: ser?.coverImageUrl || null,
        authorName: authorObj?.fullName || null,
        rating: ser?.rating || null,
        readerCount: ser?.readerCount || 0,
        chapterStatus: chap?.status || null
      }
    })
    return { status: 200, body: result }
  }


  // 8. GET /api/data/team
  if (path === "/api/data/team" && method === "GET") {
    const result = db.users.filter(u => u.roleCode === "assistant").map(a => {
      const completed = db.tasks.filter(t => t.assigneeId === a.id && t.status === "approved").length
      const inProg = db.tasks.filter(t => t.assigneeId === a.id && t.status === "in_progress").length
      return {
        id: a.id,
        name: a.fullName,
        avatar: a.avatar,
        email: a.email,
        role: a.specialty || "Assistant",
        specialty: a.specialty || "General Assistant",
        rating: a.rating || 4.5,
        tasksCompleted: completed,
        currentTasks: inProg,
        hourlyRate: a.hourlyRate || 20,
        status: a.isActive ? "active" : "inactive"
      }
    })
    return { status: 200, body: result }
  }

  // 9. GET /api/data/payroll or GET /api/payroll
  if ((path === "/api/data/payroll" || path === "/api/payroll") && method === "GET") {
    const result = db.payrollRecords.map(p => {
      const asst = db.users.find(u => u.id === p.assistantId)
      const completedTasks = db.tasks.filter(t => t.assigneeId === p.assistantId && t.status === "approved").length
      return {
        id: p.payrollRecordId,
        assistantId: p.assistantId,
        assistantName: asst?.fullName || "Kenji Yamamoto",
        assistantAvatar: asst?.avatar || "kenji",
        role: asst?.specialty || "Assistant",
        period: p.periodStart + " - " + p.periodEnd,
        tasksCompleted: completedTasks,
        pagesCompleted: Math.max(1, Math.round(completedTasks / 2)),
        baseRate: p.baseAmount,
        bonuses: p.bonusAmount,
        deductions: p.deductionAmount,
        totalAmount: p.baseAmount + p.bonusAmount - p.deductionAmount,
        status: p.status,
        paidDate: p.paidAt ? p.paidAt.substring(0, 10) : null
      }
    })
    return { status: 200, body: result }
  }

  // 10. GET /api/data/tasks or GET /api/tasks
  if ((path === "/api/data/tasks" || path === "/api/tasks") && method === "GET") {
    let list = db.tasks
    if (db.users.find(u => u.id === loggedUserId)?.roleCode === "assistant") {
      list = list.filter(t => t.assigneeId === loggedUserId)
    } else if (db.users.find(u => u.id === loggedUserId)?.roleCode === "mangaka") {
      list = list.filter(t => t.assignerId === loggedUserId)
    }

    const result = list.map(t => {
      const pageObj = db.pages.find(p => p.pageId === t.pageId)
      const chap = db.chapters.find(c => c.chapterId === pageObj?.chapterId)
      const ser = db.series.find(s => s.id === chap?.seriesId)
      return {
        id: t.taskId,
        taskId: t.taskId,
        title: t.title,
        description: t.description,
        type: t.type,
        pageId: t.pageId,
        pageNumber: pageObj?.pageNumber || 0,
        regionId: t.regionId,
        assigneeId: t.assigneeId,
        assigneeName: t.assigneeName || "Unassigned",
        assigneeAvatar: t.assigneeAvatar,
        status: t.status,
        dueDate: t.dueDate,
        payment: t.paymentAmount,
        paymentAmount: t.paymentAmount,
        chapterNumber: chap?.chapterNumber || 0,
        seriesTitle: ser?.title || "Unknown Series"
      }
    })
    return { status: 200, body: result }
  }

  // 11. GET /api/tasks/my-tasks
  if (path === "/api/tasks/my-tasks" && method === "GET") {
    const list = db.tasks.filter(t => t.assigneeId === loggedUserId)
    const result = list.map(t => {
      const pageObj = db.pages.find(p => p.pageId === t.pageId)
      const chap = db.chapters.find(c => c.chapterId === pageObj?.chapterId)
      const ser = db.series.find(s => s.id === chap?.seriesId)
      return {
        id: t.taskId,
        taskId: t.taskId,
        title: t.title,
        description: t.description,
        type: t.type,
        pageId: t.pageId,
        pageNumber: pageObj?.pageNumber || 0,
        regionId: t.regionId,
        assigneeId: t.assigneeId,
        assigneeName: t.assigneeName || "Unassigned",
        assigneeAvatar: t.assigneeAvatar,
        status: t.status,
        dueDate: t.dueDate,
        payment: t.paymentAmount,
        paymentAmount: t.paymentAmount,
        chapterNumber: chap?.chapterNumber || 0,
        seriesTitle: ser?.title || "Unknown Series"
      }
    })
    return { status: 200, body: result }
  }

  // 12. GET /api/data/review-series
  if (path === "/api/data/review-series" && method === "GET") {
    // Return series that have pages with status review or submitted
    const seriesWithReviews = db.series.filter(s => {
      const chaps = db.chapters.filter(c => c.seriesId === s.id)
      const pgList = db.pages.filter(p => chaps.map(c => c.chapterId).includes(p.chapterId))
      return pgList.some(p => p.status === "review" || p.status === "submitted")
    })

    const result = seriesWithReviews.map(s => {
      const chaps = db.chapters.filter(c => c.seriesId === s.id)
      return {
        id: s.id,
        title: s.title,
        titleJp: s.titleJp,
        author: db.users.find(u => u.id === s.mangakaId)?.fullName || "Yuki Tanaka",
        createdAt: new Date(s.createdAt).toLocaleDateString("vi-VN"),
        genre: s.genres.join(" / ") || "General",
        genres: s.genres,
        chapters: chaps.length,
        status: s.status,
        readerCount: s.readerCount,
        coverImageUrl: s.coverImageUrl,
        synopsis: s.synopsis,
        oldestReviewPageTime: new Date(s.updatedAt).toISOString()
      }
    })
    return { status: 200, body: result }
  }

  // 13. GET /api/data/review-pages
  if (path === "/api/data/review-pages" && method === "GET") {
    const chapterId = urlParams.chapterId
    let pgList = db.pages
    if (chapterId) {
      pgList = pgList.filter(p => p.chapterId === chapterId)
    } else {
      pgList = pgList.filter(p => p.status === "review" || p.status === "submitted")
    }

    const result = pgList.map(p => {
      const chap = db.chapters.find(c => c.chapterId === p.chapterId)
      const ser = db.series.find(s => s.id === chap?.seriesId)
      const annots = db.pageAnnotations.filter(a => a.pageId === p.pageId)
      const comms = db.reviewComments.filter(c => c.pageId === p.pageId)
      return {
        id: p.pageId,
        number: p.pageNumber,
        status: p.status,
        imageUrl: p.currentImageUrl,
        chapterId: p.chapterId,
        chapterNumber: chap?.chapterNumber || 0,
        seriesId: chap?.seriesId || "",
        seriesTitle: ser?.title || "Unknown Series",
        hasAnnotations: annots.length > 0,
        annotations: annots.map(a => ({
          id: a.annotationId,
          createdById: a.createdById,
          x: a.x,
          y: a.y,
          width: a.width,
          height: a.height,
          body: a.body,
          status: a.status
        })),
        comments: comms.map(c => ({
          id: c.commentId,
          userId: c.userId,
          userName: c.userName,
          avatar: c.avatar,
          body: c.body,
          createdAt: c.createdAt
        }))
      }
    })
    return { status: 200, body: result }
  }

  // 14. GET /api/data/chapter-review-queue
  if (path === "/api/data/chapter-review-queue" && method === "GET") {
    const list = db.chapters.filter(c => c.status === "tantou_review")
    const result = list.map(c => {
      const ser = db.series.find(s => s.id === c.seriesId)
      const mka = db.users.find(u => u.id === ser?.mangakaId)
      
      const chapterPages = db.pages.filter(p => p.chapterId === c.chapterId).map(p => {
        const pageAnn = db.pageAnnotations.filter(a => a.pageId === p.pageId).map(a => ({
          id: a.annotationId,
          annotationId: a.annotationId,
          pageId: a.pageId,
          createdById: a.createdById,
          x: a.x,
          y: a.y,
          width: a.width,
          height: a.height,
          body: a.body,
          status: a.status,
          createdAt: a.createdAt
        }))
        
        return {
          id: p.pageId,
          pageId: p.pageId,
          chapterId: p.chapterId,
          number: p.pageNumber,
          pageNumber: p.pageNumber,
          status: p.status,
          imageUrl: p.currentImageUrl,
          currentImageUrl: p.currentImageUrl,
          annotations: pageAnn
        }
      })

      return {
        chapterId: c.chapterId,
        chapterNumber: c.chapterNumber,
        title: c.title,
        status: c.status,
        dueDate: c.dueDate,
        submittedForPublishingAt: c.submittedForPublishingAt || c.updatedAt,
        tantouReviewNote: c.tantouReviewNote,
        seriesId: c.seriesId,
        seriesTitle: ser?.title || "Unknown",
        author: mka?.fullName || "Yuki Tanaka",
        coverImageUrl: ser?.coverImageUrl || null,
        pages: chapterPages
      }
    })
    return { status: 200, body: result }
  }

  // 15. GET /api/proposals
  if (path === "/api/proposals" && method === "GET") {
    const list = db.proposals.map(p => {
      const isApproved = p.status === "approved"
      const isRejected = p.status === "rejected"
      return {
        proposalId: p.proposalId,
        seriesId: p.seriesId,
        seriesTitle: p.title,
        seriesSynopsis: p.synopsis,
        seriesGenres: p.genres,
        submittedById: "11111111-1111-1111-1111-111111111111", // Yuki Tanaka
        submittedByName: p.authorName || "Yuki Tanaka",
        reviewedById: isApproved || isRejected ? "33333333-3333-3333-3333-333333333333" : null,
        reviewedByName: isApproved || isRejected ? "Sakura Ito" : null,
        status: p.status === "pending" ? "Submitted" : p.status === "approved" ? "Approved" : "Rejected",
        feedback: p.feedback || null,
        submittedAt: p.submittedAt,
        reviewedAt: p.reviewedAt || null,
        coverImageUrl: p.coverImageUrl,
        ranking: null,
        readerCount: 0,
        rating: 5.0
      }
    })
    return { status: 200, body: list }
  }

  // 16. POST /api/proposals
  if (path === "/api/proposals" && method === "POST") {
    const body = JSON.parse(init?.body as string || "{}")
    const proposalId = `p-${Date.now()}`
    const author = db.users.find(u => u.id === loggedUserId)
    const newProposal = {
      proposalId,
      seriesId: `s-temp-${Date.now()}`,
      title: body.title || "Untitled Series",
      titleJp: body.titleJp || "",
      synopsis: body.synopsis || "",
      coverImageUrl: body.coverImageUrl || "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500&auto=format&fit=crop&q=80",
      genres: body.genres || ["Action"],
      status: "pending" as const,
      submittedAt: new Date().toISOString(),
      authorName: author?.fullName || "Yuki Tanaka"
    }
    db.proposals.unshift(newProposal)

    // Add audit log
    db.auditLogs.unshift({
      auditLogId: `log-${Date.now()}`,
      userId: loggedUserId,
      action: "Submit Proposal",
      entityType: "Proposal",
      entityId: proposalId,
      detailsJson: JSON.stringify({ title: newProposal.title }),
      createdAt: new Date().toISOString()
    })

    saveDB(db)
    
    // Map to frontend expected response type
    const mappedResponse = {
      proposalId: newProposal.proposalId,
      seriesId: newProposal.seriesId,
      seriesTitle: newProposal.title,
      seriesSynopsis: newProposal.synopsis,
      seriesGenres: newProposal.genres,
      submittedById: loggedUserId,
      submittedByName: newProposal.authorName,
      reviewedById: null,
      reviewedByName: null,
      status: "Submitted",
      feedback: null,
      submittedAt: newProposal.submittedAt,
      reviewedAt: null,
      coverImageUrl: newProposal.coverImageUrl,
      ranking: null,
      readerCount: 0,
      rating: 5.0
    }

    return { status: 200, body: mappedResponse }
  }

  // 17. PUT /api/proposals/:id/review
  const proposalReviewMatch = path.match(/\/api\/proposals\/([a-zA-Z0-9_\-]+)\/review/)
  if (proposalReviewMatch && method === "PUT") {
    const pId = proposalReviewMatch[1]
    const body = JSON.parse(init?.body as string || "{}")
    const matchedProp = db.proposals.find(p => p.proposalId === pId)
    if (matchedProp) {
      const isApproved = body.decision === "approved"
      matchedProp.status = isApproved ? "approved" : "rejected"
      matchedProp.feedback = body.feedback
      matchedProp.reviewedAt = new Date().toISOString()

      if (isApproved) {
        // Create active series from proposal
        const newSeriesId = `series-${Date.now()}`
        const newSeries = {
          id: newSeriesId,
          title: matchedProp.title,
          titleJp: matchedProp.titleJp,
          synopsis: matchedProp.synopsis,
          coverImageUrl: matchedProp.coverImageUrl,
          status: "active" as const,
          mangakaId: "11111111-1111-1111-1111-111111111111", // Yuki Tanaka
          tantouId: body.tantouId || "33333333-3333-3333-3333-333333333333", // Sakura Ito (Editor)
          ranking: null,
          readerCount: 0,
          rating: 5.0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          genres: matchedProp.genres
        }
        db.series.unshift(newSeries)
        matchedProp.seriesId = newSeriesId

        // Add Chapter 1
        const chapId = `chap-${Date.now()}`
        db.chapters.push({
          chapterId: chapId,
          seriesId: newSeriesId,
          chapterNumber: 1,
          title: "Chapter 1: The Beginning",
          status: "draft",
          dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().substring(0, 10),
          updatedAt: new Date().toISOString()
        })

        // Add page 1 to chapter
        db.pages.push({
          pageId: `page-temp-${Date.now()}`,
          chapterId: chapId,
          pageNumber: 1,
          status: "pending",
          currentImageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
          uploadedAt: null
        })
      }

      // Add audit log
      db.auditLogs.unshift({
        auditLogId: `log-${Date.now()}`,
        userId: loggedUserId,
        action: isApproved ? "Approve Proposal" : "Reject Proposal",
        entityType: "Proposal",
        entityId: pId,
        detailsJson: JSON.stringify({ feedback: body.feedback }),
        createdAt: new Date().toISOString()
      })

      saveDB(db)
      
      const mappedResponse = {
        proposalId: matchedProp.proposalId,
        seriesId: matchedProp.seriesId,
        seriesTitle: matchedProp.title,
        seriesSynopsis: matchedProp.synopsis,
        seriesGenres: matchedProp.genres,
        submittedById: "11111111-1111-1111-1111-111111111111",
        submittedByName: matchedProp.authorName,
        reviewedById: loggedUserId,
        reviewedByName: db.users.find(u => u.id === loggedUserId)?.fullName || "Sakura Ito",
        status: isApproved ? "Approved" : "Rejected",
        feedback: matchedProp.feedback,
        submittedAt: matchedProp.submittedAt,
        reviewedAt: matchedProp.reviewedAt,
        coverImageUrl: matchedProp.coverImageUrl,
        ranking: null,
        readerCount: 0,
        rating: 5.0
      }

      return { status: 200, body: mappedResponse }
    }
    return { status: 404, body: { error: "Proposal not found" } }
  }

  // 17b. GET /api/users/by-role/tantou
  if (path === "/api/users/by-role/tantou" && method === "GET") {
    const list = db.users.filter(u => u.roleCode === "tantou").map(u => ({
      userId: u.id,
      fullName: u.fullName,
      email: u.email,
      avatar: u.avatar
    }))
    return { status: 200, body: list }
  }


  // 17c. GET /api/series and POST /api/series
  if (path === "/api/series" && method === "GET") {
    const result = db.series.map(s => {
      const chaps = db.chapters.filter(c => c.seriesId === s.id)
      return {
        id: s.id,
        seriesId: s.id,
        title: s.title,
        titleJp: s.titleJp,
        synopsis: s.synopsis,
        coverImageUrl: s.coverImageUrl,
        status: s.status,
        genres: s.genres,
        chapterCount: chaps.length,
        readerCount: s.readerCount,
        rating: s.rating,
        ranking: s.ranking,
        createdAt: s.createdAt,
        updatedAt: s.updatedAt,
        riskLevel: "normal",
        riskReason: null,
        cancellationReason: s.cancellationReason || null
      }
    })
    return { status: 200, body: result }
  }
  if (path === "/api/series" && method === "POST") {
    const body = JSON.parse(init?.body as string || "{}")
    const newSeriesId = `series-${Date.now()}`
    const newSeries = {
      id: newSeriesId,
      title: body.title || "Untitled Series",
      titleJp: body.titleJp || "",
      synopsis: body.synopsis || "",
      coverImageUrl: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&auto=format&fit=crop&q=80",
      status: "proposal" as const,
      mangakaId: loggedUserId,
      tantouId: null,
      ranking: null,
      readerCount: 0,
      rating: 5.0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      genres: body.genres || []
    }
    db.series.unshift(newSeries)
    
    // Add to proposals too
    db.proposals.unshift({
      proposalId: `proposal-${Date.now()}`,
      seriesId: newSeriesId,
      title: newSeries.title,
      titleJp: newSeries.titleJp,
      synopsis: newSeries.synopsis,
      coverImageUrl: newSeries.coverImageUrl,
      genres: newSeries.genres,
      status: "pending",
      submittedAt: new Date().toISOString(),
      authorName: db.users.find(u => u.id === loggedUserId)?.fullName || "Yuki Tanaka"
    })

    saveDB(db)
    return { status: 200, body: newSeries }
  }


  // 18. GET /api/series/:id/chapters
  const seriesChaptersMatch = path.match(/\/api\/series\/([a-zA-Z0-9_\-]+)\/chapters/)
  if (seriesChaptersMatch && method === "GET") {
    const sId = seriesChaptersMatch[1]
    const list = db.chapters.filter(c => c.seriesId === sId).sort((a, b) => b.chapterNumber - a.chapterNumber)
    return { status: 200, body: list }
  }
  if (seriesChaptersMatch && method === "POST") {
    const sId = seriesChaptersMatch[1]
    const body = JSON.parse(init?.body as string || "{}")
    const newChapterId = `chap-${Date.now()}`
    const newChapter = {
      chapterId: newChapterId,
      seriesId: sId,
      chapterNumber: Number(body.chapterNumber) || 1,
      title: body.title || "Untitled Chapter",
      status: "draft" as const,
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().substring(0, 10),
      updatedAt: new Date().toISOString()
    }
    db.chapters.push(newChapter)
    
    // Add audit log
    db.auditLogs.unshift({
      auditLogId: `log-${Date.now()}`,
      userId: loggedUserId,
      action: "Create Chapter",
      entityType: "Chapter",
      entityId: newChapterId,
      detailsJson: JSON.stringify({ title: newChapter.title, chapterNumber: newChapter.chapterNumber }),
      createdAt: new Date().toISOString()
    })

    saveDB(db)
    return { status: 200, body: newChapter }
  }


  // 19. GET /api/chapters/:id/pages
  const chapterPagesMatch = path.match(/\/api\/chapters\/([a-zA-Z0-9_\-]+)\/pages/)
  if (chapterPagesMatch && method === "GET") {
    const cId = chapterPagesMatch[1]
    const list = db.pages.filter(p => p.chapterId === cId).sort((a, b) => a.pageNumber - b.pageNumber)
    
    // Structure expected: list of pages
    const result = list.map(p => {
      const annots = db.pageAnnotations.filter(a => a.pageId === p.pageId)
      const comms = db.reviewComments.filter(c => c.pageId === p.pageId)
      return {
        id: p.pageId,
        pageId: p.pageId,
        chapterId: p.chapterId,
        pageNumber: p.pageNumber,
        imageUrl: p.currentImageUrl,
        currentImageUrl: p.currentImageUrl,
        status: p.status,
        uploadedAt: p.uploadedAt,
        annotations: annots.map(a => ({
          id: a.annotationId,
          createdById: a.createdById,
          x: a.x,
          y: a.y,
          width: a.width,
          height: a.height,
          body: a.body,
          status: a.status
        })),
        comments: comms.map(c => ({
          id: c.commentId,
          userId: c.userId,
          userName: c.userName,
          avatar: c.avatar,
          body: c.body,
          createdAt: c.createdAt
        }))
      }
    })
    return { status: 200, body: result }
  }

  // 20. GET /api/pages/:id/tasks
  const pageTasksMatch = path.match(/\/api\/pages\/([a-zA-Z0-9_\-]+)\/tasks/)
  if (pageTasksMatch && method === "GET") {
    const pId = pageTasksMatch[1]
    const list = db.tasks.filter(t => t.pageId === pId)
    return { status: 200, body: list }
  }

  // 21. POST /api/pages/:id/tasks
  if (pageTasksMatch && method === "POST") {
    const pId = pageTasksMatch[1]
    const body = JSON.parse(init?.body as string || "{}")
    const newTaskId = `task-${Date.now()}`
    
    const assigneeUser = db.users.find(u => u.id === body.assigneeId)
    
    const newTask = {
      taskId: newTaskId,
      title: body.title || "New Task",
      description: body.description || "",
      type: body.type || "line_art",
      pageId: pId,
      regionId: body.regionId || null,
      assigneeId: body.assigneeId || null,
      assigneeName: assigneeUser?.fullName || "Unassigned",
      assigneeAvatar: assigneeUser?.avatar || null,
      assignerId: loggedUserId,
      status: (body.assigneeId ? "in_progress" : "pending") as const,
      dueDate: body.dueDate || null,
      paymentAmount: body.paymentAmount || 50.00,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    db.tasks.push(newTask)

    // Update page status to assigned if assignee is set
    const pageObj = db.pages.find(p => p.pageId === pId)
    if (pageObj && newTask.status === "in_progress") {
      pageObj.status = "assigned"
    }

    // Send notification to assignee
    if (body.assigneeId) {
      db.notifications.unshift({
        notificationId: `notif-${Date.now()}`,
        userId: body.assigneeId,
        type: "task_assigned",
        title: "New Task Assigned",
        message: `You have been assigned to task: "${newTask.title}"`,
        isRead: false,
        link: "/tasks",
        createdAt: new Date().toISOString()
      })
    }

    saveDB(db)
    return { status: 200, body: newTask }
  }

  // 22. GET /api/assistants
  if (path === "/api/assistants" && method === "GET") {
    const list = db.users.filter(u => u.roleCode === "assistant").map(a => ({
      userId: a.id,
      fullName: a.fullName,
      email: a.email,
      avatar: a.avatar,
      specialty: a.specialty || "General Assistant",
      rating: a.rating || 4.5,
      hourlyRate: a.hourlyRate || 20.0
    }))
    return { status: 200, body: list }
  }

  // 23. POST /api/tasks/:id/start
  const taskStartMatch = path.match(/\/api\/tasks\/([a-zA-Z0-9_\-]+)\/start/)
  if (taskStartMatch && method === "POST") {
    const tId = taskStartMatch[1]
    const t = db.tasks.find(tk => tk.taskId === tId)
    if (t) {
      t.status = "in_progress"
      t.updatedAt = new Date().toISOString()
      
      const pageObj = db.pages.find(p => p.pageId === t.pageId)
      if (pageObj) pageObj.status = "in_progress"
      
      saveDB(db)
      return { status: 200, body: t }
    }
    return { status: 404, body: { error: "Task not found" } }
  }

  // 24. POST /api/tasks/:id/submit
  const taskSubmitMatch = path.match(/\/api\/tasks\/([a-zA-Z0-9_\-]+)\/submit/)
  if (taskSubmitMatch && method === "POST") {
    const tId = taskSubmitMatch[1]
    const t = db.tasks.find(tk => tk.taskId === tId)
    if (t) {
      t.status = "submitted"
      t.updatedAt = new Date().toISOString()
      
      const pageObj = db.pages.find(p => p.pageId === t.pageId)
      if (pageObj) {
        pageObj.status = "submitted"
        // Also simulate uploading a finished version if it is submitted
        pageObj.currentImageUrl = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80"
        pageObj.uploadedAt = new Date().toISOString()
      }

      // Notify Assigner
      db.notifications.unshift({
        notificationId: `notif-${Date.now()}`,
        userId: t.assignerId,
        type: "task_submitted",
        title: "Task Submitted",
        message: `${t.assigneeName} submitted task: "${t.title}" for review.`,
        isRead: false,
        link: "/review",
        createdAt: new Date().toISOString()
      })

      saveDB(db)
      return { status: 200, body: t }
    }
    return { status: 404, body: { error: "Task not found" } }
  }

  // 25. POST /api/pages/:id/reviews
  const pageReviewMatch = path.match(/\/api\/pages\/([a-zA-Z0-9_\-]+)\/reviews/)
  if (pageReviewMatch && method === "POST") {
    const pId = pageReviewMatch[1]
    const body = JSON.parse(init?.body as string || "{}")
    const pageObj = db.pages.find(p => p.pageId === pId)
    
    if (pageObj) {
      const isApproved = body.status?.toLowerCase() === "approved"
      pageObj.status = isApproved ? "approved" : "review"
      
      // Update any tasks on this page
      const pageTasks = db.tasks.filter(t => t.pageId === pId)
      pageTasks.forEach(t => {
        if (isApproved) {
          t.status = "approved"
        } else {
          t.status = "revision"
        }
        t.updatedAt = new Date().toISOString()
      })

      // Add a comment to page reviews
      const reviewer = db.users.find(u => u.id === loggedUserId)
      db.reviewComments.push({
        commentId: `comment-${Date.now()}`,
        pageId: pId,
        userId: loggedUserId,
        userName: reviewer?.fullName || "Reviewer",
        avatar: reviewer?.avatar || "system",
        body: body.note || (isApproved ? "Approved the page." : "Requested changes for this page."),
        createdAt: new Date().toISOString()
      })

      // Check if all pages in the chapter are approved to mark chapter approved
      const siblingPages = db.pages.filter(p => p.chapterId === pageObj.chapterId)
      const allApproved = siblingPages.every(p => p.status === "approved")
      if (allApproved) {
        const chap = db.chapters.find(c => c.chapterId === pageObj.chapterId)
        if (chap && chap.status !== "published") {
          chap.status = "approved"
        }
      }

      saveDB(db)
      return { status: 200, body: { success: true } }
    }
    return { status: 404, body: { error: "Page not found" } }
  }

  // 26. POST /api/pages/:id/annotations
  const pageAnnotationMatch = path.match(/\/api\/pages\/([a-zA-Z0-9_\-]+)\/annotations/)
  if (pageAnnotationMatch && method === "POST") {
    const pId = pageAnnotationMatch[1]
    const body = JSON.parse(init?.body as string || "{}")
    const newAnnot = {
      annotationId: `annot-${Date.now()}`,
      pageId: pId,
      createdById: loggedUserId,
      x: body.x || 0,
      y: body.y || 0,
      width: body.width || null,
      height: body.height || null,
      body: body.body || "",
      status: "open" as const,
      createdAt: new Date().toISOString()
    }
    db.pageAnnotations.push(newAnnot)
    saveDB(db)
    return { status: 200, body: newAnnot }
  }

  // 27. POST /api/pages/:id/comments
  const pageCommentMatch = path.match(/\/api\/pages\/([a-zA-Z0-9_\-]+)\/comments/)
  if (pageCommentMatch && method === "POST") {
    const pId = pageCommentMatch[1]
    const body = JSON.parse(init?.body as string || "{}")
    const commenter = db.users.find(u => u.id === loggedUserId)
    const newComment = {
      commentId: `comment-${Date.now()}`,
      pageId: pId,
      userId: loggedUserId,
      userName: commenter?.fullName || "Commenter",
      avatar: commenter?.avatar || "system",
      body: body.body || "",
      createdAt: new Date().toISOString()
    }
    db.reviewComments.push(newComment)
    saveDB(db)
    return { status: 200, body: newComment }
  }

  // 28. GET /api/notifications
  if (path === "/api/notifications" && method === "GET") {
    const list = db.notifications.filter(n => n.userId === loggedUserId)
    return { status: 200, body: list }
  }

  // 29. POST /api/notifications/:id/read
  const notificationReadMatch = path.match(/\/api\/notifications\/([a-zA-Z0-9_\-]+)\/read/)
  if (notificationReadMatch && method === "POST") {
    const nId = notificationReadMatch[1]
    const notif = db.notifications.find(n => n.notificationId === nId)
    if (notif) {
      notif.isRead = true
      saveDB(db)
      return { status: 200, body: { success: true } }
    }
    return { status: 404, body: { error: "Notification not found" } }
  }

  // 30. POST /api/notifications/read-all
  if (path === "/api/notifications/read-all" && method === "POST") {
    db.notifications.filter(n => n.userId === loggedUserId).forEach(n => {
      n.isRead = true
    })
    saveDB(db)
    return { status: 200, body: { success: true } }
  }

  // 31. POST /api/chapters/:id/submit
  const chapterSubmitMatch = path.match(/\/api\/chapters\/([a-zA-Z0-9_\-]+)\/submit/)
  if (chapterSubmitMatch && method === "POST") {
    const cId = chapterSubmitMatch[1]
    const chap = db.chapters.find(c => c.chapterId === cId)
    if (chap) {
      chap.status = "tantou_review"
      chap.submittedForPublishingAt = new Date().toISOString()
      
      // Add audit log
      db.auditLogs.unshift({
        auditLogId: `log-${Date.now()}`,
        userId: loggedUserId,
        action: "Submit Chapter for Review",
        entityType: "Chapter",
        entityId: cId,
        detailsJson: JSON.stringify({ chapterNumber: chap.chapterNumber }),
        createdAt: new Date().toISOString()
      })

      saveDB(db)
      return { status: 200, body: { success: true } }
    }
    return { status: 404, body: { error: "Chapter not found" } }
  }

  // 31b. POST /api/chapters/:id/tantou-review
  const chapterTantouReviewMatch = path.match(/\/api\/chapters\/([a-zA-Z0-9_\-]+)\/tantou-review/)
  if (chapterTantouReviewMatch && method === "POST") {
    const cId = chapterTantouReviewMatch[1]
    const body = JSON.parse(init?.body as string || "{}")
    const chap = db.chapters.find(c => c.chapterId === cId)
    if (chap) {
      const decision = body.decision
      if (decision === "approved") {
        chap.status = "approved"
        chap.tantouReviewNote = body.note
      } else {
        chap.status = "in_progress" // send back to progress
        chap.tantouReviewNote = body.note
      }
      chap.updatedAt = new Date().toISOString()

      // Add audit log
      db.auditLogs.unshift({
        auditLogId: `log-${Date.now()}`,
        userId: loggedUserId,
        action: `Chapter Review: ${decision}`,
        entityType: "Chapter",
        entityId: cId,
        detailsJson: JSON.stringify({ note: body.note }),
        createdAt: new Date().toISOString()
      })

      saveDB(db)
      return { status: 200, body: { success: true } }
    }
    return { status: 404, body: { error: "Chapter not found" } }
  }

  // 31c. POST /api/chapters/:id/schedule
  const chapterScheduleMatch = path.match(/\/api\/chapters\/([a-zA-Z0-9_\-]+)\/schedule/)
  if (chapterScheduleMatch && method === "POST") {
    const cId = chapterScheduleMatch[1]
    const body = JSON.parse(init?.body as string || "{}")
    const chap = db.chapters.find(c => c.chapterId === cId)
    if (chap) {
      const newSchedule = {
        publishScheduleId: `sched-${Date.now()}`,
        chapterId: cId,
        scheduledDate: body.scheduledDate,
        status: "scheduled" as const,
        createdAt: new Date().toISOString()
      }
      db.publishSchedules.push(newSchedule)
      
      // Update chapter status
      chap.status = "published"
      chap.updatedAt = new Date().toISOString()

      saveDB(db)
      return { status: 200, body: newSchedule }
    }
    return { status: 404, body: { error: "Chapter not found" } }
  }

  // 31d. PUT /api/publish-schedules/:id/approve
  const scheduleApproveMatch = path.match(/\/api\/publish-schedules\/([a-zA-Z0-9_\-]+)\/approve/)
  if (scheduleApproveMatch && method === "PUT") {
    const sId = scheduleApproveMatch[1]
    const sched = db.publishSchedules.find(s => s.publishScheduleId === sId)
    if (sched) {
      sched.status = "published"
      sched.approvedById = loggedUserId
      sched.publishedAt = new Date().toISOString()

      saveDB(db)
      return { status: 200, body: { success: true } }
    }
    return { status: 404, body: { error: "Schedule not found" } }
  }

  // 31e. GET /api/tasks/:id/resources
  const taskResourcesMatch = path.match(/\/api\/tasks\/([a-zA-Z0-9_\-]+)\/resources/)
  if (taskResourcesMatch && method === "GET") {
    const tId = taskResourcesMatch[1]
    const t = db.tasks.find(tk => tk.taskId === tId)
    if (t) {
      const pageObj = db.pages.find(p => p.pageId === t.pageId)
      const chap = db.chapters.find(c => c.chapterId === pageObj?.chapterId)
      const ser = db.series.find(s => s.id === chap?.seriesId)
      return {
        status: 200,
        body: {
          imageUrl: pageObj?.currentImageUrl || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
          seriesTitle: ser?.title || "Unknown Series",
          chapterNumber: chap?.chapterNumber || 0,
          pageNumber: pageObj?.pageNumber || 0
        }
      }
    }
    return { status: 404, body: { error: "Task not found" } }
  }

  // 31f. POST /api/tasks/:id/ask
  const taskAskMatch = path.match(/\/api\/tasks\/([a-zA-Z0-9_\-]+)\/ask/)
  if (taskAskMatch && method === "POST") {
    const tId = taskAskMatch[1]
    const body = JSON.parse(init?.body as string || "{}")
    const t = db.tasks.find(tk => tk.taskId === tId)
    if (t) {
      // Send notification to Mangaka/Assigner
      db.notifications.unshift({
        notificationId: `notif-${Date.now()}`,
        userId: t.assignerId,
        type: "system",
        title: "Clarification Requested",
        message: `${t.assigneeName || "Assistant"} asked: "${body.message}" on task "${t.title}"`,
        isRead: false,
        link: "/tasks",
        createdAt: new Date().toISOString()
      })
      saveDB(db)
      return { status: 200, body: { success: true } }
    }
    return { status: 404, body: { error: "Task not found" } }
  }

  // 31g. GET /api/series/ranking
  if (path === "/api/series/ranking" && method === "GET") {
    // Format response matching ASP.NET container
    const rankingsList: any[] = db.series.map((s, idx) => {
      const authorObj = db.users.find(u => u.id === s.mangakaId)
      
      // Calculate a score/votes based on reader count
      const votes = s.readerCount ? Math.round(s.readerCount / 4) : 1000
      const score = votes * 1.5
      const views = s.readerCount * 3
      const growthRate = idx === 0 ? 12.5 : idx === 1 ? 5.2 : -2.4

      let riskLevel = "normal"
      let riskReason = null
      if (idx >= 2) {
        riskLevel = "warning"
        riskReason = "Low ranking and decreasing reader votes over the last 3 weeks."
      }

      return {
        seriesId: s.id,
        title: s.title,
        coverImageUrl: s.coverImageUrl,
        authorName: authorObj?.fullName || "Yuki Tanaka",
        rank: idx + 1,
        previousRank: idx === 0 ? 2 : idx === 1 ? 1 : idx + 1,
        score,
        readerVotes: votes,
        views,
        growthRate,
        status: riskLevel === "normal" ? "normal" : "at_risk",
        seriesStatus: s.status,
        riskLevel,
        riskReason,
        cancellationReason: s.cancellationReason || null,
        genres: s.genres
      }
    })

    const totalVotes = rankingsList.reduce((acc, curr) => acc + curr.readerVotes, 0)
    const totalViews = rankingsList.reduce((acc, curr) => acc + curr.views, 0)

    const container = {
      totalSeriesRanked: rankingsList.length,
      topTrendingTitle: rankingsList[0]?.title || "Dragon Hunters",
      totalReaderVotes: totalVotes,
      totalViews: totalViews,
      rankings: rankingsList
    }

    return { status: 200, body: container }
  }

  // 31h. PUT /api/series/:id/editorial-decision
  const seriesEditorialDecisionMatch = path.match(/\/api\/series\/([a-zA-Z0-9_\-]+)\/editorial-decision/)
  if (seriesEditorialDecisionMatch && method === "PUT") {
    const sId = seriesEditorialDecisionMatch[1]
    const body = JSON.parse(init?.body as string || "{}")
    const s = db.series.find(sr => sr.id === sId)
    if (s) {
      s.status = body.decision // cancelled, hiatus, or active
      if (body.decision === "cancelled") {
        s.cancellationReason = body.reason
      } else {
        s.cancellationReason = null
      }
      s.updatedAt = new Date().toISOString()

      // Add audit log
      db.auditLogs.unshift({
        auditLogId: `log-${Date.now()}`,
        userId: loggedUserId,
        action: `Editorial Decision: ${body.decision}`,
        entityType: "Series",
        entityId: sId,
        detailsJson: JSON.stringify({ reason: body.reason }),
        createdAt: new Date().toISOString()
      })

      saveDB(db)
      return { status: 200, body: { success: true } }
    }
    return { status: 404, body: { error: "Series not found" } }
  }

  // 32. POST /api/publish-schedules or /api/publish-schedule
  if ((path === "/api/publish-schedule" || path === "/api/publish-schedules") && method === "POST") {

    const body = JSON.parse(init?.body as string || "{}")
    const newSchedule = {
      publishScheduleId: `sched-${Date.now()}`,
      chapterId: body.chapterId,
      scheduledDate: body.scheduledDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      status: "scheduled" as const,
      approvedById: loggedUserId,
      createdAt: new Date().toISOString()
    }
    db.publishSchedules.push(newSchedule)

    // Mark chapter as published or scheduled
    const chap = db.chapters.find(c => c.chapterId === body.chapterId)
    if (chap) {
      chap.status = "published"
    }

    // Add audit log
    db.auditLogs.unshift({
      auditLogId: `log-${Date.now()}`,
      userId: loggedUserId,
      action: "Approve and Schedule Chapter",
      entityType: "Chapter",
      entityId: body.chapterId,
      detailsJson: JSON.stringify({ scheduledDate: newSchedule.scheduledDate }),
      createdAt: new Date().toISOString()
    })

    saveDB(db)
    return { status: 200, body: newSchedule }
  }

  // 33. POST /api/series/:id/upload-cover
  const seriesUploadCoverMatch = path.match(/\/api\/series\/([a-zA-Z0-9_\-]+)\/upload-cover/)
  if (seriesUploadCoverMatch && method === "POST") {
    const sId = seriesUploadCoverMatch[1]
    const s = db.series.find(sr => sr.id === sId)
    if (s) {
      s.coverImageUrl = "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&auto=format&fit=crop&q=80"
      saveDB(db)
      return { status: 200, body: { coverImageUrl: s.coverImageUrl } }
    }
    return { status: 404, body: { error: "Series not found" } }
  }

  // 34. POST /api/mangaka/chapters/:id/upload-pages
  const uploadPagesMatch = path.match(/\/api\/mangaka\/chapters\/([a-zA-Z0-9_\-]+)\/upload-pages/)
  if (uploadPagesMatch && method === "POST") {
    const cId = uploadPagesMatch[1]
    
    // Simulate uploading a file. Since it's mock, we generate a mock page item
    const chapterPages = db.pages.filter(p => p.chapterId === cId)
    const nextNumber = chapterPages.length > 0 ? Math.max(...chapterPages.map(p => p.pageNumber)) + 1 : 1
    const newPage = {
      pageId: `page-uploaded-${Date.now()}`,
      chapterId: cId,
      pageNumber: nextNumber,
      status: "review" as const,
      currentImageUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80",
      uploadedAt: new Date().toISOString()
    }
    db.pages.push(newPage)
    saveDB(db)
    return { status: 200, body: { fileUrl: newPage.currentImageUrl } }
  }

  // 35. GET /api/series/:id
  const seriesDetailMatch = path.match(/\/api\/series\/([a-zA-Z0-9_\-]+)/)
  if (seriesDetailMatch && method === "GET") {
    const sId = seriesDetailMatch[1]
    const s = db.series.find(sr => sr.id === sId)
    if (s) {
      const authorObj = db.users.find(u => u.id === s.mangakaId)
      return {
        status: 200,
        body: {
          id: s.id,
          title: s.title,
          titleJp: s.titleJp,
          synopsis: s.synopsis,
          coverImageUrl: s.coverImageUrl,
          status: s.status,
          mangakaId: s.mangakaId,
          authorName: authorObj?.fullName || "Yuki Tanaka",
          rating: s.rating,
          readerCount: s.readerCount,
          genres: s.genres
        }
      }
    }
    return { status: 404, body: { error: "Series not found" } }
  }

  // 36. GET /api/chapters/:id
  const chapterDetailMatch = path.match(/\/api\/chapters\/([a-zA-Z0-9_\-]+)/)
  if (chapterDetailMatch && method === "GET") {
    const cId = chapterDetailMatch[1]
    const c = db.chapters.find(ch => ch.chapterId === cId)
    if (c) {
      return {
        status: 200,
        body: {
          chapterId: c.chapterId,
          seriesId: c.seriesId,
          chapterNumber: c.chapterNumber,
          title: c.title,
          status: c.status,
          dueDate: c.dueDate
        }
      }
    }
    return { status: 404, body: { error: "Chapter not found" } }
  }

  // 37. GET /api/pages/:id/versions
  const pageVersionsMatch = path.match(/\/api\/pages\/([a-zA-Z0-9_\-]+)\/versions/)
  if (pageVersionsMatch && method === "GET") {
    const pId = pageVersionsMatch[1]
    const p = db.pages.find(page => page.pageId === pId)
    if (p) {
      const versions = [
        {
          pageVersionId: `v-${pId}-1`,
          pageId: pId,
          versionNumber: 1,
          fileUrl: p.currentImageUrl,
          fileName: `page_${p.pageNumber}_v1.png`,
          uploadedByName: "Kenji Yamamoto",
          createdAt: p.uploadedAt || new Date(Date.now() - 3600000).toISOString(),
          note: "Draft storyboard and ink sketch",
          isCurrent: false
        },
        {
          pageVersionId: `v-${pId}-2`,
          pageId: pId,
          versionNumber: 2,
          fileUrl: p.currentImageUrl,
          fileName: `page_${p.pageNumber}_v2.png`,
          uploadedByName: "Kenji Yamamoto",
          createdAt: p.uploadedAt || new Date().toISOString(),
          note: "Final clean line art",
          isCurrent: true
        }
      ]
      return { status: 200, body: versions }
    }
    return { status: 404, body: { error: "Page not found" } }
  }

  // 38. GET /api/chapters/:id/versions
  const chapterVersionsMatch = path.match(/\/api\/chapters\/([a-zA-Z0-9_\-]+)\/versions/)
  if (chapterVersionsMatch && method === "GET") {
    const cId = chapterVersionsMatch[1]
    const chapPages = db.pages.filter(p => p.chapterId === cId)
    
    const pagesWithVersions = chapPages.map(p => {
      return {
        pageId: p.pageId,
        pageNumber: p.pageNumber,
        status: p.status,
        currentImageUrl: p.currentImageUrl,
        changedAfterRevision: p.pageNumber === 3, // Mock showing page 3 changed
        versions: [
          {
            pageVersionId: `v-${p.pageId}-1`,
            pageId: p.pageId,
            versionNumber: 1,
            fileUrl: p.currentImageUrl,
            fileName: `page_${p.pageNumber}_v1.png`,
            uploadedByName: "Kenji Yamamoto",
            createdAt: p.uploadedAt || new Date(Date.now() - 3600000).toISOString(),
            note: "First pass storyboard",
            isCurrent: false
          },
          {
            pageVersionId: `v-${p.pageId}-2`,
            pageId: p.pageId,
            versionNumber: 2,
            fileUrl: p.currentImageUrl,
            fileName: `page_${p.pageNumber}_v2.png`,
            uploadedByName: "Kenji Yamamoto",
            createdAt: p.uploadedAt || new Date().toISOString(),
            note: "Clean character lines",
            isCurrent: true
          }
        ]
      }
    })
    return { status: 200, body: { pages: pagesWithVersions } }
  }

  // 39. GET /api/chapters/:id/audit-timeline
  const chapterAuditMatch = path.match(/\/api\/chapters\/([a-zA-Z0-9_\-]+)\/audit-timeline/)
  if (chapterAuditMatch && method === "GET") {
    const cId = chapterAuditMatch[1]
    const auditTimeline = [
      {
        auditLogId: `audit-c-${cId}-1`,
        userName: "Yuki Tanaka",
        action: "Create Chapter Draft",
        entityType: "Chapter",
        detailsJson: JSON.stringify({ note: "Setup template pages" }),
        createdAt: new Date(Date.now() - 48 * 3600 * 1000).toISOString()
      },
      {
        auditLogId: `audit-c-${cId}-2`,
        userName: "Kenji Yamamoto",
        action: "Submit Page 3",
        entityType: "Page",
        detailsJson: JSON.stringify({ pageNumber: 3 }),
        createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString()
      },
      {
        auditLogId: `audit-c-${cId}-3`,
        userName: "Sakura Ito",
        action: "Add Review Comment",
        entityType: "Page",
        detailsJson: JSON.stringify({ comment: "Speech bubble overlap" }),
        createdAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString()
      }
    ]
    return { status: 200, body: auditTimeline }
  }

  return null
}

export function setupMockApi() {
  if (typeof window === "undefined") return
  
  // Prevent duplicate setups
  if ((window as any).__MOCK_API_SETUP__) return
  ;(window as any).__MOCK_API_SETUP__ = true

  const isMockMode = process.env.NEXT_PUBLIC_USE_MOCK === "true" || !process.env.NEXT_PUBLIC_API_URL
  if (!isMockMode) {
    console.log("[MOCK API] Running with standard live backend API.")
    return
  }

  console.log("[MOCK API] Mock Mode enabled. Intercepting API fetches...")
  
  const originalFetch = window.fetch
  window.fetch = async function (input, init) {
    const urlStr = input instanceof URL ? input.href : typeof input === "string" ? input : input.url
    
    // Check if the URL points to our backend API endpoints
    const isApiCall = urlStr.includes("/api/")
    if (isApiCall) {
      const mockResponse = await handleMockRequest(urlStr, init)
      if (mockResponse !== null) {
        // Log to console for developer visibility
        console.groupCollapsed(`%c[MOCK API] Intercepted %c${init?.method || "GET"} %c${urlStr.split("/api/")[1].split("?")[0]}`, "color: #10b981; font-weight: bold;", "color: #3b82f6; font-weight: bold;", "color: #9ca3af;")
        console.log("Full Request URL:", urlStr)
        console.log("Request Init:", init)
        console.log("Response Body:", mockResponse.body)
        console.log("Response Status:", mockResponse.status)
        console.groupEnd()

        // Return simulated Response
        return new Response(JSON.stringify(mockResponse.body), {
          status: mockResponse.status,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization"
          }
        })
      }
    }

    return originalFetch.call(this, input, init)
  }
}
