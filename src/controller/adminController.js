const md5 = require('md5');
const Category = require('../model/Category');
const Product = require('../model/Product');
const User = require('../model/User');
//[GET]
class AdminController {
  //[GET] Page login
  login = (req, res) => {
    if (req.signedCookies.email) {
      res.redirect('/admin/home');
      return;
    }
    return res.render('admin/login.ejs', { err: '' });
  };

  //GET home page login
  getHomepage = (req, res) => {
    if (req.signedCookies.email) {
      return res.render('admin/home.ejs', { data: req.data[0], url: req.url });
    }
  };
  //GET checklogin page
  checkuser = async (req, res) => {
    const { user_name, password } = req.body;
    const hashPassword = md5(Number(password));
    if (!user_name || !password) {
      return res.render('admin/login.ejs', {
        err: 'Vui lòng nhập đầy đủ thông tin',
      });
    }
    try {
      const user = await User.findOne({
        username: user_name,
        password: hashPassword,
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
          res.cookie('email', dataUser?.email, {
            signed: true,
          });
          return res.render('admin/home.ejs', { data: dataUser, url: req.url });
        }
      } else {
        return res.render('admin/login.ejs', {
          err: 'Sai tài khoản hoặc mật khẩu',
        });
      }
    } catch (error) {
      return res.render('admin/login.ejs', {
        err: 'Đã có lỗi xảy ra',
      });
    }
  };

  // LOGOUT
  logout = (req, res) => {
    res.clearCookie('email');
    return res.redirect('/admin');
  };

  //GET account page
  account = async (req, res) => {
    try {
      const data = await User.find();
      return res.render('admin/account.ejs', { data: data, url: req.url });
    } catch (error) {
      return res.render('admin/account.ejs', { data: [], url: req.url });
    }
  };
  //GET create account page
  getCreateAccount = async (req, res) => {
    return res.render('admin/createAccount.ejs', { url: req.url });
  };
  //POST create account page
  createAccount = async (req, res) => {
    const { username, email, password } = req.body;
    const hashPassword = md5(Number(password));
    try {
      await User.create({
        username,
        email,
        password: hashPassword,
        role: 'user',
      });
      return res.redirect('/admin/account');
    } catch (err) {
      console.log(err);
      console.log('err', err);
    }
  };
  // delete account page
  deleteAccount = async (req, res) => {
    const { id } = req.params;
    try {
      await User.findByIdAndDelete(id);
      return res.redirect('/admin/account');
    } catch (err) {
      console.log(err);
      return res.redirect('/admin/account');
    }
  };

  //GET categories page
  categories = async (req, res) => {
    try {
      const data = await Category.find();
      return res.render('admin/categories.ejs', { data: data, url: req.url });
    } catch (err) {
      console.log(err);
      return res.render('admin/categories.ejs', { data: [], url: req.url });
    }
  };

  // delete categories page
  deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
      await Category.findByIdAndDelete(id);
      return res.redirect('/admin/categories');
    } catch (err) {
      console.log(err);
      return res.redirect('/admin/categories');
    }
  };

  // edit categories page
  editCategory = async (req, res) => {
    //get category by id
    const { id } = req.params;
    try {
      const data = await Category.findById(id);
      return res.render('admin/editCategory.ejs', {
        data: data,
        url: req.url,
      });
    } catch (err) {
      console.log(err);
      return res.redirect('/admin/categories');
    }
  };

  // update categories
  updateCategory = async (req, res) => {
    const { ten_dm } = req.body;
    const { id } = req.params;
    try {
      await Category.findByIdAndUpdate(
        id,
        {
          ten_dm,
        },
        {
          new: true,
        }
      );
      return res.redirect('/admin/categories');
    } catch (err) {
      console.log(err);
      return res.redirect('/admin/categories');
    }
  };

  //GET create categories page
  getCreateCategory = async (req, res) => {
    return res.render('admin/createCategories.ejs', { url: req.url });
  };
  //POST create categories page
  createCategory = async (req, res) => {
    const { ten_dm } = req.body;
    try {
      await Category.create({
        ten_dm,
      });
      return res.redirect('/admin/categories');
    } catch (err) {
      console.log(err);
      return res.redirect('/admin/categories');
    }
  };

  // Get bills page
  bills = async (req, res) => {
    const sql = `SELECT * FROM hoa_don`;
    const [rows] = await pool.execute(sql);
    const list_idthanhvien = [...rows].map((item) => item.id_thanhvien);
    list_idthanhvien.join(',');
    const sqluser = `SELECT * FROM thanhvien WHERE id_thanhvien IN (${list_idthanhvien})`;
    const [rowsuser] = await pool.execute(sqluser);
    return res.render('admin/bills.ejs', {
      data: rows,
      data2: rowsuser,
      url: req.url,
    });
  };

  // delete bills
  deleteBill = async (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM hoa_don WHERE id  = ${id}`;
    console.log('Checkk SQL:>>>>>', sql);
    await pool.execute(sql);
    return res.redirect('/admin/bills');
  };

  // GET products page
  products = async (req, res) => {
    try {
      const data = await Product.find();
      return res.render('admin/products.ejs', { data: data, url: req.url });
    } catch (err) {
      console.log(err);
      return res.render('admin/products.ejs', { data: [], url: req.url });
    }
  };
  // delete products
  deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
      await Product.findByIdAndDelete(id);
      return res.redirect('/admin/products');
    } catch (err) {
      console.log(err);
      return res.redirect('/admin/products');
    }
  };
  // GET edit product page
  editProduct = async (req, res) => {
    const { id } = req.params;
    try {
      const data = await Product.findById(id);
      const dataCategory = await Category.find();
      return res.render('admin/editProduct.ejs', {
        data: data,
        data2: dataCategory,
        url: req.url,
      });
    } catch (err) {
      console.log(err);
      return res.redirect('/admin/products');
    }
  };
  // update product
  updateProduct = async (req, res) => {
    if (req.file != null || req.file != undefined) {
      req.body.avatar = req.file.path.split('\\').slice(2).join('/');
    }
    const { id } = req.params;
    const { ten_sp, gia_sp, trang_thai, ma_dm, khuyen_mai, avatar } = req.body;
    const avatarSelect = await Product.findById(id).select('avatar');
    try {
      await Product.findByIdAndUpdate(
        id,
        {
          ten_sp,
          gia_sp,
          trang_thai,
          ma_dm,
          khuyen_mai,
          avatar: avatar ? avatar : avatarSelect.avatar,
        },
        {
          new: true,
        }
      );
      return res.redirect('/admin/products');
    } catch (err) {
      console.log(err);
      return res.redirect('/admin/products');
    }
  };
  // GET create product page
  getCreateProduct = async (req, res) => {
    try {
      const data = await Category.find();
      return res.render('admin/createProduct.ejs', {
        data: data,
        url: req.url,
      });
    } catch (err) {
      console.log(err);
      return res.render('admin/createProduct.ejs', { data: [], url: req.url });
    }
  };
  //POST create product page
  createProduct = async (req, res) => {
    if (req.file != null || req.file != undefined) {
      req.body.avatar = req.file.path.split('\\').slice(2).join('/');
    }
    const { ten_sp, gia_sp, trang_thai, ma_dm, khuyen_mai, avatar } = req.body;
    try {
      await Product.create({
        ten_sp,
        gia_sp,
        trang_thai,
        ma_dm,
        khuyen_mai,
        avatar,
      });
      return res.redirect('/admin/products');
    } catch (err) {
      console.log(err);
      return res.redirect('/admin/products');
    }
  };

  // GET comments page
  // comments = async (req, res) => {
  //   const sql = `SELECT * FROM blsanpham`;
  //   const [rows] = await pool.execute(sql);

  //   console.log(rows);
  //   return res.render('admin/comments.ejs', { data: rows, url: req.url });
  // };
  // // delete comments
  // deleteComment = async (req, res) => {
  //   const { id } = req.params;
  //   const sql = `DELETE FROM blsanpham WHERE blsanpham.id_bl = ${id}`;
  //   await pool.execute(sql);
  //   return res.redirect('/admin/comments');
  // };
}

module.exports = new AdminController();
