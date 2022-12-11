const User = require('../model/User');
const requireAuth = async (req, res, next) => {
  if (!req.signedCookies.email) {
    res.redirect('/admin');
    return;
  }
  try {
    const user = await User.findOne({
      email: req.signedCookies.email,
    });
    const dataUser = {
      id: user?.id,
      user_name: user?.username,
      email: user?.email,
      role: user?.role,
    };
    if (
      dataUser?.id &&
      dataUser?.role &&
      dataUser?.email &&
      dataUser?.user_name &&
      user
    ) {
      if (dataUser.role === 'admin') {
        req.data = [dataUser];
        res.locals.user = dataUser;
        next();
      }
    } else {
      return res.render('admin/login.ejs', {
        err: 'Sai tài khoản hoặc mật khẩu',
      });
    }
  } catch {
    console.log('error');
  }
};
// const requireAuthbyUser = async (req, res, next) => {
//   if (req.signedCookies.email_user) {
//     const sql = `SELECT * FROM thanhvien WHERE email = '${req.signedCookies.email_user}'`;
//     const [rows] = await pool.query(sql);
//     if (rows.length > 0 && rows[0].quyen_truy_cap === 0) {
//       req.data = [rows[0]];
//       res.locals.user_client = rows[0];
//       next();
//       return;
//     } else {
//       next();
//     }
//   }
//   next();
// };

// const requireAuthbyUser1 = async (req, res, next) => {
//   if (!req.signedCookies.email_user) {
//     res.redirect('/user/login');
//     return;
//   }
//   const sql = `SELECT * FROM thanhvien WHERE email = '${req.signedCookies.email_user}'`;
//   const [rows] = await pool.query(sql);
//   if (rows.length > 0 && rows[0].quyen_truy_cap === 0) {
//     req.data = [rows[0]];
//     res.locals.user_client = rows[0];
//     next();
//   }
// };

// check same email
const checkEmail = async (req, res, next) => {
  const { email } = req.body;
  const sql = `SELECT * FROM thanhvien WHERE email = '${email}'`;
  const [rows] = await pool.query(sql);
  if (rows.length > 0) {
    res.render('pages/register', { error: 'Email đã tồn tại' });
    return;
  }
  next();
};

module.exports = {
  requireAuth,
  checkEmail,
  // requireAuthbyUser,
  // requireAuthbyUser1,
};
