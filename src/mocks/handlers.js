import { handlers as loginHandler } from './domains/login';
import { handlers as profilePicHandler } from './domains/profilePic';
import { handlers as skillsHandler } from './domains/skills';
import { handlers as jobsHandler } from './domains/jobs';
import { handlers as projectsHandler } from './domains/projects';
import { handlers as contactsHandler } from './domains/contacts';
import { handlers as mediasHandler } from './domains/medias';

export const handlers = [
  ...loginHandler,
  ...profilePicHandler,
  ...skillsHandler,
  ...jobsHandler,
  ...projectsHandler,
  ...contactsHandler,
  ...mediasHandler,
];
