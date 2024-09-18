import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  Tree,
} from '@nx/devkit';
import * as path from 'path';
import { LibrarySubmoduleGeneratorGeneratorSchema } from './schema';
import { execSync } from 'child_process';

export async function librarySubmoduleGeneratorGenerator(
  tree: Tree,
  options: LibrarySubmoduleGeneratorGeneratorSchema
) {
  const projectRoot = `libs/${options.name}`;
  addProjectConfiguration(tree, options.name, {
    root: projectRoot,
    projectType: 'library',
    sourceRoot: `${projectRoot}/src`,
    targets: {},
  });
  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, options);
  await formatFiles(tree);
  const libPath = path.join('libs', options.name);
  // Initialize git repository
  execSync(`cd ${libPath} && git init`, { stdio: 'inherit' });

  // Add a remote repository
  const remoteRepoUrl = `https://github.com/eq60477/${options.name}.git`;
  execSync(`cd ${libPath} && git remote add origin ${remoteRepoUrl}`, {
    stdio: 'inherit',
  });

  // Commit and push to the remote repository
  execSync(
    `cd ${libPath} && git add . && git commit -m "Initial commit" && git push -u origin main`,
    {
      stdio: 'inherit',
    }
  );

  // Add the submodule to the main repository
  execSync(`git submodule add ${remoteRepoUrl} libs/feature/${options.name}`, {
    stdio: 'inherit',
  });

  // Commit the submodule addition to the main repository
  execSync(
    `git add . && git commit -m "Add submodule for ${options.name} library"`,
    {
      stdio: 'inherit',
    }
  );
}

export default librarySubmoduleGeneratorGenerator;
