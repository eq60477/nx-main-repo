import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import { librarySubmoduleGeneratorGenerator } from './generator';
import { LibrarySubmoduleGeneratorGeneratorSchema } from './schema';

describe('library-submodule-generator generator', () => {
  let tree: Tree;
  const options: LibrarySubmoduleGeneratorGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await librarySubmoduleGeneratorGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });
});
