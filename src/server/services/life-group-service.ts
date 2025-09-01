import { LifeGroupRepository } from "../repository/life-group-repository";

export async function lifeGroupList() {
  const lifeGroupRepository = new LifeGroupRepository();
  return await lifeGroupRepository.findMany({});
}

export async function lifeGroupById(id: string) {
  const lifeGroupRepository = new LifeGroupRepository();
  return await lifeGroupRepository.findById(id);
}

export async function lifeGroupCreate({
  name,
  voucher,
}: {
  name: string;
  voucher: string;
}) {
  const lifeGroupRepository = new LifeGroupRepository();
  await lifeGroupRepository.save({
    name,
    voucher,
  });
}

export async function lifeGroupUpdate({
  id,
  name,
  voucher,
}: {
  id: string;
  name: string | undefined;
  voucher: string | undefined;
}) {
  const lifeGroupRepository = new LifeGroupRepository();
  await lifeGroupRepository.update(id, {
    name,
    voucher,
  });
}

export async function lifeGroupDelete(id: string) {
  const lifeGroupRepository = new LifeGroupRepository();
  await lifeGroupRepository.delete(id);
}
