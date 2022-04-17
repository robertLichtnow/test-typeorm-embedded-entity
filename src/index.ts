import { createConnections, getConnectionManager, getRepository } from 'typeorm';
import { Child } from '~/entities/Child';
import { Parent } from '~/entities/Parent';

(async () => {
  await createConnections();
  const connection = getConnectionManager().get('default');
  await connection.query('DROP TABLE IF EXISTS children;')
  await connection.query('DROP TABLE IF EXISTS parents;')

  await connection.synchronize();

  const parentRepository = getRepository(Parent);

  // # start region - parent with single child

  const onlyChild = new Child();
  onlyChild.name = "only child";
  const parent = new Parent();
  parent.name = 'parent';
  parent.children = [onlyChild];

  const managedParent = parentRepository.create(parent);
  const storedParent = await parentRepository.save(managedParent);

  // # end region

  // # start region - same parent with two children. Only child is now older brother
  const olderBrother = new Child();
  olderBrother.id = storedParent.children[0].id;
  olderBrother.name = "older brother";

  const youngerBrother = new Child();
  youngerBrother.name = "younger brother";

  const sameParent = new Parent();
  sameParent.id = storedParent.id;
  sameParent.name = storedParent.name;
  sameParent.children = [olderBrother, youngerBrother];

  const managedParentOfTwoChildren = parentRepository.create(sameParent);
  await parentRepository.save(managedParentOfTwoChildren);
  // # end region

  // # start region - deleting parent cascades to deleting children
  await parentRepository.delete(storedParent.id);
  // #end region
})();
