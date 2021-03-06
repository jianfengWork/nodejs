const db = require('../libs/database');
module.exports = async (res, get, post, files) => {
  let { name, price, count } = post;

  if (!name || !price || !count) {
    res.writeJson({ error: 1, msg: 'params invaild' });
    res.end();
  } else {
    price = Number(price);
    count = Number(count);

    if (isNaN(price) || isNaN(count)) {
      res.writeJson({ error: 1, msg: 'params invaild' });
      res.end();
    } else {
      try {
        await db.query('INSERT INTO item_table (name, price, count) VALUES(?,?,?)', [name, price, count]); // 防止 sql 注入

        res.writeJson({ error: 0, msg: 'success' });
      } catch (e) {
        res.writeJson({ error: 1, msg: 'database error' });
      }
      res.end();
    }
  }
};
