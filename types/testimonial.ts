export interface Testimonial {
  id: string;
  spaceId: string;
  content: string;
  type: 'text' | 'video';
  createdAt: Date;
}

export interface CreateTestimonialInput {
  spaceId: string;
  content: string;
  type: 'text' | 'video';
}