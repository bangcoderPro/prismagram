import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeRooms: (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      return prisma.rooms({
        where: {
          participants_some: {
            id: user.id
          }
        }
      });
      // const user = await prisma.user({ id });
      // const following = await prisma.user({ id: user.id }).following();
      // console.log(following.map(user => user.id).push(user.id));
      // return prisma.posts({
      //     where: {
      //         user: {
      //             id_in: [...following.map(user => user.id), user.id]
      //         }
      //     },
      //     orderBy: "createdAt_DESC"
      // });
    }
  }
};
