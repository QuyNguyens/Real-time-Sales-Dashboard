// utils/getFakeDataCount.ts
export const getFakeDataCount = () => {
  try {
    const settings = JSON.parse(localStorage.getItem("fakeDataSettings") || "{}");
    return {
      orderCount: parseInt(settings.orderCount) || 1,
      userCount: parseInt(settings.userCount) || 1,
      productCount: parseInt(settings.productCount) || 3,
    };
  } catch {
    return {
      orderCount: 1,
      userCount: 1,
      productCount: 3,
    };
  }
};
