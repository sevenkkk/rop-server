import { Prisma } from '@prisma/client';

export type CreateProjectRequest = Pick<
  Prisma.ProjectCreateInput,
  'id' | 'name' | 'description' | 'framework'
> & { workspaceId: string };

export type UpdateProjectRequest = Omit<CreateProjectRequest, 'framework'>;
