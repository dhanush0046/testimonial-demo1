export interface Space {
  id: string;
  spaceName: string;
  headerTitle: string;
  customMessage: string;
  questions: string[];
  createdAt: Date;
  shareableLink: string | null;
}

export interface CreateSpaceInput {
  spaceName: string;
  headerTitle: string;
  customMessage: string;
  questions: string[];
}