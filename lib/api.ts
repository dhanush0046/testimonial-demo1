//lib/api.ts
import { CreateSpaceInput, Space } from '../types/space';
import { CreateTestimonialInput, Testimonial } from '../types/testimonial';

export async function createSpace(input: CreateSpaceInput): Promise<Space> {
  const response = await fetch('/api/spaces', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error('Failed to create space');
  }

  const data = await response.json();
  if (!data.newSpace || !data.newSpace.id) {
    throw new Error('Invalid response from server');
  }

  return data.newSpace;
}

export async function getSpace(spaceId: string): Promise<Space> {
  const response = await fetch(`/api/spaces/${spaceId}`);

  if (!response.ok) {
    throw new Error('Failed to fetch space');
  }

  return response.json();
}

export async function createTestimonial(input: CreateTestimonialInput): Promise<Testimonial> {
  const response = await fetch('/api/testimonials', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error('Failed to create testimonial');
  }

  return response.json();
}

export async function createVideoTestimonial(spaceId: string, videoBlob: Blob): Promise<Testimonial> {
  const formData = new FormData();
  formData.append('spaceId', spaceId);
  formData.append('type', 'video');
  formData.append('video', videoBlob, 'testimonial.webm');

  const response = await fetch('/api/testimonials', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to create video testimonial');
  }

  return response.json();
}