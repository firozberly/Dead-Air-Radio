/**
 * GET /api/radio/current
 * 
 * Returns current and upcoming show metadata for the radio player
 * Public endpoint - no authentication required
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const now = new Date();

    // Get the current/next schedule slot
    const currentSlot = await prisma.scheduleSlot.findFirst({
      where: {
        startAt: {
          lte: now, // Slot has started
        },
        endAt: {
          gte: now, // Slot hasn't ended yet
        },
      },
      include: {
        show: {
          include: {
            curator: {
              select: {
                id: true,
                name: true,
                slug: true,
                imageUrl: true,
              },
            },
            playlists: {
              include: {
                items: {
                  include: {
                    track: {
                      select: {
                        id: true,
                        title: true,
                        duration: true,
                        genre: true,
                        audioUrl: true,
                        artist: {
                          select: {
                            id: true,
                            name: true,
                            slug: true,
                          },
                        },
                      },
                    },
                  },
                  orderBy: { position: 'asc' },
                },
              },
            },
          },
        },
      },
      orderBy: { startAt: 'asc' },
    });

    // Get next show (if current one is ending soon)
    const nextSlot = await prisma.scheduleSlot.findFirst({
      where: {
        startAt: {
          gt: now,
        },
      },
      include: {
        show: {
          include: {
            curator: {
              select: {
                id: true,
                name: true,
                slug: true,
                imageUrl: true,
              },
            },
          },
        },
      },
      orderBy: { startAt: 'asc' },
      take: 1,
    });

    return NextResponse.json({
      success: true,
      data: {
        current: currentSlot ? {
          id: currentSlot.id,
          startAt: currentSlot.startAt,
          endAt: currentSlot.endAt,
          show: {
            id: currentSlot.show.id,
            title: currentSlot.show.title,
            slug: currentSlot.show.slug,
            description: currentSlot.show.description,
            imageUrl: currentSlot.show.imageUrl,
            curator: currentSlot.show.curator,
            playlist: currentSlot.show.playlists[0] || null, // Return first playlist
          },
        } : null,
        next: nextSlot ? {
          id: nextSlot.id,
          startAt: nextSlot.startAt,
          endAt: nextSlot.endAt,
          show: {
            id: nextSlot.show.id,
            title: nextSlot.show.title,
            slug: nextSlot.show.slug,
            description: nextSlot.show.description,
            imageUrl: nextSlot.show.imageUrl,
            curator: nextSlot.show.curator,
          },
        } : null,
        streamUrl: process.env.LIVE_STREAM_URL || null,
      },
    });
  } catch (error) {
    console.error('Error fetching current radio metadata:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch metadata' },
      { status: 500 }
    );
  }
}
