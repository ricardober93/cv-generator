import { Hono } from "hono";
import { CreateCurriculumValidationSchema, type Curriculum } from "../models/Curruculum";
import { zValidator } from "@hono/zod-validator";
import { userMiddleware } from "../kinde";

import { db } from "../db";
import { curriculum as curriculumTable } from "../db/schema";
import { eq } from "drizzle-orm";

export const manager = new Hono()
  .get("/", userMiddleware, async (c) => {
    const user = c.get("user");
    const curriculums = await db.select().from(curriculumTable).where(eq(curriculumTable.userId, user.id));

    if (!curriculums) {
      return c.json(
        {
          curriculums,
        },
        200
      );
    }

    return c.json(
      {
        curriculums,
      },
      200
    );
  }) 
  .get("/:id{[0-9]+}", userMiddleware, async (c) => {

    const id = c.req.param("id");
    const curriculum = await db.select().from(curriculumTable).where(eq(curriculumTable.id, id));

    if (!curriculum) {
      return c.status(404);
    }
    return c.json(
      {
        curriculum,
      },
      200
    );
  })
  .post("/create", userMiddleware, zValidator("json", CreateCurriculumValidationSchema), async (c) => {
    const body = (await c.req.json()) as Curriculum;
    const user = c.get("user");

    const newCurriculum = await db.insert(curriculumTable).values({
      userId: user.id,
      address: body.address,
      education: body.education,
      email: body.email,
      experience: body.experience,
      name: body.name,
      skills: body.skills,
      phone: body.phone,
    });
    return c.json(
      {
        newCurriculum,
      },
      200
    );
  }) // POST
  .put("/:id{[0-9]+}", userMiddleware, async (c) => {
    const id = c.req.param("id");
    const body = (await c.req.json()) as Curriculum;

    const note = await db.select().from(curriculumTable).where(eq(curriculumTable.id, id));

    if (!note) {
      return c.status(404);
    }
    const updatedNote = await db
      .update(curriculumTable)
      .set({
        name: body.name,
        email: body.email,
        phone: body.phone,
        address: body.address,
        education: body.education,
      })
      .where(eq(curriculumTable.id, id));
    return c.json(
      {
        updatedNote,
      },
      200
    );
  }) // PUT
  .delete("/:id", userMiddleware, async (c) => {
    const id = c.req.param("id");

    const note = await db.select().from(curriculumTable).where(eq(curriculumTable.id, id));

    if (!note) {
      return c.status(404);
    }

    const deletedNote = await db.delete(curriculumTable).where(eq(curriculumTable.id, id));

    return c.json(
      {
        deletedNote,
      },
      200
    );
  }); // DELETE
