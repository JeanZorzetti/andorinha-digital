/**
 * Test fixtures and mock data for unit and integration tests
 */

import type { User, Post, WebhookSubscription, Notification } from '@prisma/client'

export const mockUsers = {
  admin: {
    id: 'admin-id-123',
    name: 'Admin User',
    email: 'admin@andorinha.digital',
    emailVerified: new Date(),
    password: '$2a$10$mockedHashedPassword', // bcrypt hash for "password123"
    image: null,
    role: 'ADMIN' as const,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  } satisfies User,

  author: {
    id: 'author-id-456',
    name: 'Author User',
    email: 'author@andorinha.digital',
    emailVerified: new Date(),
    password: '$2a$10$mockedHashedPassword',
    image: null,
    role: 'AUTHOR' as const,
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
  } satisfies User,

  client: {
    id: 'client-id-789',
    name: 'Client User',
    email: 'client@example.com',
    emailVerified: new Date(),
    password: '$2a$10$mockedHashedPassword',
    image: null,
    role: 'CLIENT' as const,
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
    coverImage: '/images/test-cover.jpg',
    authorId: mockUsers.author.id,
    status: 'PUBLISHED' as const,
    featured: false,
    views: 100,
    publishedAt: new Date('2024-02-01'),
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-02-01'),
  } satisfies Post,

  draft: {
    id: 'post-id-222',
    title: 'Draft Test Post',
    slug: 'draft-test-post',
    content: '<p>This is a draft test post content.</p>',
    excerpt: 'This is a draft test post',
    coverImage: null,
    authorId: mockUsers.author.id,
    status: 'DRAFT' as const,
    featured: false,
    views: 0,
    publishedAt: null,
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-10'),
  } satisfies Post,
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
    userId: mockUsers.client.id,
    type: 'SUCCESS' as const,
    title: 'Welcome!',
    message: 'Your account has been created successfully.',
    link: null,
    read: false,
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-15'),
  } satisfies Notification,

  read: {
    id: 'notification-id-yyy',
    userId: mockUsers.client.id,
    type: 'INFO' as const,
    title: 'New Feature',
    message: 'Check out our new dashboard features!',
    link: '/admin/dashboard',
    read: true,
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-12'),
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
    userId: mockUsers.client.id,
    name: mockUsers.client.name,
    email: mockUsers.client.email,
    role: mockUsers.client.role,
    createdAt: mockUsers.client.createdAt.toISOString(),
  },
}
