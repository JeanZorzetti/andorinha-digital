/**
 * Test fixtures and mock data for unit and integration tests
 */

import type { User, BlogPost, WebhookSubscription, Notification } from '@prisma/client'

export const mockUsers = {
  admin: {
    id: 'admin-id-123',
    name: 'Admin User',
    email: 'admin@andorinha.digital',
    password: '$2a$10$mockedHashedPassword', // bcrypt hash for "password123"
    image: null,
    role: 'ADMIN' as const,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  } satisfies User,

  editor: {
    id: 'editor-id-456',
    name: 'Editor User',
    email: 'editor@andorinha.digital',
    password: '$2a$10$mockedHashedPassword',
    image: null,
    role: 'EDITOR' as const,
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
  } satisfies User,

  user: {
    id: 'user-id-789',
    name: 'Regular User',
    email: 'user@example.com',
    password: '$2a$10$mockedHashedPassword',
    image: null,
    role: 'USER' as const,
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03'),
  } satisfies User,
}

export const mockPosts = {
  published: {
    id: 'post-id-111',
    title: 'Published Test Post',
    slug: 'published-test-post',
    content: '<p>This is a published test post content.</p>',
    excerpt: 'This is a published test post',
    image: '/images/test-cover.jpg',
    category: 'Technology',
    tags: ['test', 'published'],
    authorId: mockUsers.editor.id,
    author: mockUsers.editor.name,
    status: 'PUBLISHED' as const,
    date: '2024-02-01',
    readTime: '5 min',
    metaTitle: null,
    metaDescription: null,
    metaKeywords: [],
    publishedAt: new Date('2024-02-01'),
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-02-01'),
  } satisfies BlogPost,

  draft: {
    id: 'post-id-222',
    title: 'Draft Test Post',
    slug: 'draft-test-post',
    content: '<p>This is a draft test post content.</p>',
    excerpt: 'This is a draft test post',
    image: '/images/test-draft.jpg',
    category: 'General',
    tags: ['test', 'draft'],
    authorId: mockUsers.editor.id,
    author: mockUsers.editor.name,
    status: 'DRAFT' as const,
    date: '2024-02-10',
    readTime: '3 min',
    metaTitle: null,
    metaDescription: null,
    metaKeywords: [],
    publishedAt: null,
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-10'),
  } satisfies BlogPost,
}

export const mockWebhooks = {
  active: {
    id: 'webhook-id-aaa',
    name: 'Production Webhook',
    url: 'https://api.example.com/webhooks',
    events: ['USER_CREATED', 'POST_PUBLISHED'],
    secret: 'webhook-secret-key-123',
    description: 'Production webhook for user and post events',
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  } satisfies WebhookSubscription,

  inactive: {
    id: 'webhook-id-bbb',
    name: 'Inactive Webhook',
    url: 'https://api.example.com/webhooks/inactive',
    events: ['USER_DELETED'],
    secret: 'webhook-secret-key-456',
    description: null,
    isActive: false,
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
  } satisfies WebhookSubscription,
}

export const mockNotifications = {
  unread: {
    id: 'notification-id-xxx',
    userId: mockUsers.user.id,
    type: 'SUCCESS' as const,
    title: 'Welcome!',
    message: 'Your account has been created successfully.',
    link: null,
    read: false,
    createdAt: new Date('2024-02-15'),
  } satisfies Notification,

  read: {
    id: 'notification-id-yyy',
    userId: mockUsers.user.id,
    type: 'INFO' as const,
    title: 'New Feature',
    message: 'Check out our new dashboard features!',
    link: '/admin/dashboard',
    read: true,
    createdAt: new Date('2024-02-10'),
  } satisfies Notification,
}

export const mockApiResponses = {
  success: {
    success: true,
    message: 'Operation completed successfully',
  },
  error: {
    success: false,
    error: 'An error occurred',
  },
  validationError: {
    success: false,
    error: 'Validation failed',
  },
}

export const mockWebhookPayload = {
  event: 'USER_CREATED' as const,
  timestamp: new Date().toISOString(),
  data: {
    userId: mockUsers.user.id,
    name: mockUsers.user.name,
    email: mockUsers.user.email,
    role: mockUsers.user.role,
    createdAt: mockUsers.user.createdAt.toISOString(),
  },
}
