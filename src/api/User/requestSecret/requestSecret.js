import { generateSecret, sendSecretMail } from "../../../utils";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    requestSecret: async (_, args) => {
      const { email } = args;
      const loginSecret = generateSecret();
      try {
        await sendSecretMail(email, loginSecret);
        await prisma.updateUser({ data: { loginSecret }, where: { email } });
        return true;
      } catch {
        return false;
      }
    }
  }
};

// export default {
//   Mutation: {
//     requestSecret: async (_, args, { request }) => {
//       console.log(request);
//       const { email } = args;
//       const loginSecret = generateSecret();
//       // throw Error("haleluyah motha");
//       console.log(loginSecret);
//       try {
//         await sendSecretMail(email, loginSecret);
//         await prisma.updateUser({ data: { loginSecret }, where: { email } });
//         return true;
//       } catch (error) {
//         console.log(error);
//         return false;
//       }
//     },
//   },
// };

// xport default {
//   Query: {
//     userById: async (_, args) => {
//       const { id } = args;
//       console.log(id);
//       return await prisma.user({ id });
//     }
//   }
// };
