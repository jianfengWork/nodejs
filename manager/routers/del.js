const db = require('../libs/database');
module.exports = async (res, get, post, files) => {
  try {
    await db.query(`DELETE FROM item_table WHERE ID=5`);
    res.writeJson({ error: 0, msg: '删除成功' });
  } catch (e) {
    res.writeJson({ error: 1, msg: 'database error' });
  }

  res.end();
};
