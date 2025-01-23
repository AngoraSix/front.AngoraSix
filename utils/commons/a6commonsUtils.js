export const isA6ResourceAdmin = (userId, a6Resource) =>
    userId != null && a6Resource.admins?.some((contr) => contr.contributorId === userId);