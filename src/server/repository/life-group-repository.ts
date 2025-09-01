import { db } from "@/db";
import {
  type InsertLifeGroup,
  lifeGroupTable,
  type SelectLifeGroup,
} from "@/db/schema/life-group";
import { eq, like } from "drizzle-orm";
import { type IBaseRepository } from "./interface";

export async function getLifeGroupByVoucher(voucher: string) {
  const lifeGroup = await db.query.lifeGroupTable.findFirst({
    where: eq(lifeGroupTable.voucher, voucher),
  });
  return lifeGroup?.id;
}

export class LifeGroupRepository
  implements IBaseRepository<SelectLifeGroup, InsertLifeGroup>
{
  async save(data: InsertLifeGroup): Promise<void> {
    await db.insert(lifeGroupTable).values(data);
  }

  async findMany({
    page = 1,
    limit = 10,
    search,
  }: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<Array<SelectLifeGroup>> {
    const offset = (page - 1) * limit;

    return db.query.lifeGroupTable.findMany({
      where: search ? like(lifeGroupTable.name, `%${search}%`) : undefined,
      limit: limit,
      offset: offset,
    });
  }

  async findById(
    id: SelectLifeGroup["id"],
  ): Promise<SelectLifeGroup | undefined> {
    return db.query.lifeGroupTable.findFirst({
      where: eq(lifeGroupTable.id, id),
    });
  }

  async findByVoucher(voucher: SelectLifeGroup["voucher"]) {
    const lifeGroup = await db.query.lifeGroupTable.findFirst({
      where: eq(lifeGroupTable.voucher, voucher),
    });
    return lifeGroup?.id;
  }

  async update(
    id: string,
    data: Partial<Omit<SelectLifeGroup, "id">>,
  ): Promise<void> {
    await db.update(lifeGroupTable).set(data).where(eq(lifeGroupTable.id, id));
  }

  async delete(id: string): Promise<void> {
    await db.delete(lifeGroupTable).where(eq(lifeGroupTable.id, id));
  }
}
