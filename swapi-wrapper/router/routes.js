import API_CONTROLLER from '../controller/api-controller.js';

export default router => {

  router.get('/table-data', API_CONTROLLER.getTableData);

  router.get('/chart-data', API_CONTROLLER.getChartData);

  router.get('/scroll-text', API_CONTROLLER.getScrollingText);

  return router;
}