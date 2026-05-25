/**
 * Mock API route: GET /api/radio/current
 * Returns current show and streaming metadata
 */

import { NextResponse } from 'next/server';
import { radio } from '@/lib/mock-data';

export async function GET() {
  // Mock response structure
  const mockData = {
    data: {
      current: {
        show: {
          id: 'show-001',
          title: radio.currentShow,
          slug: 'midnight-transmission',
          description: 'Late night experimental audio transmissions and sonic rituals.',
          imageUrl: null,
          curator: {
            id: 'curator-001',
            name: 'Iris Null',
            slug: 'iris-null',
            imageUrl: null,
          },
          playlist: {
            items: [
              {
                track: {
                  id: 'track-001',
                  title: 'Static Bloom',
                  duration: 420,
                  audioUrl: radio.streamUrl,
                  artist: {
                    id: 'artist-001',
                    name: 'NOVA UNIT',
                    slug: 'nova-unit',
                  },
                },
              },
              {
                track: {
                  id: 'track-002',
                  title: 'Concrete Echo',
                  duration: 510,
                  audioUrl: radio.streamUrl,
                  artist: {
                    id: 'artist-002',
                    name: 'Subtle Frequencies',
                    slug: 'subtle-frequencies',
                  },
                },
              },
              {
                track: {
                  id: 'track-003',
                  title: 'Signal Loss',
                  duration: 380,
                  audioUrl: radio.streamUrl,
                  artist: {
                    id: 'artist-001',
                    name: 'NOVA UNIT',
                    slug: 'nova-unit',
                  },
                },
              },
            ],
          },
        },
        startAt: new Date().toISOString(),
        endAt: new Date(Date.now() + 3600000).toISOString(),
      },
      next: {
        show: {
          id: 'show-002',
          title: radio.nextShow,
          slug: 'acid-dawn',
        },
        startAt: new Date(Date.now() + 3600000).toISOString(),
      },
      streamUrl: radio.streamUrl,
    },
  };

  return NextResponse.json(mockData, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
    },
  });
}
