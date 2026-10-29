// ديوان: عامل الخدمة لعرض إشعارات الرسائل وفتح المحادثة عند الضغط عليها
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("notificationclick", e => {
  e.notification.close();
  const conv = e.notification.data && e.notification.data.conv;
  e.waitUntil((async () => {
    const list = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    for (const c of list) {
      if ("focus" in c) {
        c.postMessage({ type: "openConv", conv });
        return c.focus();
      }
    }
    return self.clients.openWindow(conv ? "./#messages" : "./");
  })());
});
