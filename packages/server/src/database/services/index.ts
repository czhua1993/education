import { myPoetryService } from './my-poetry';
import { poetryService } from './poetry';

export const service = {
  poetry: poetryService,
  myPoetry: myPoetryService,
};

export type ServiceType = typeof service;
