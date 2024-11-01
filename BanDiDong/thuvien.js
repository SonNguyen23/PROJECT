var cart = JSON.parse(localStorage.getItem("cart"));
if (cart != null) {
  mang = cart;
} else {
  var mang = [];
}

if (cart != null) {
  console.log("Dữ liệu trong local storage:", cart);
} else {
  console.log("Không có dữ liệu trong local storage");
}

var btn = document.getElementsByClassName("addtocart");

for (let i = 0; i < btn.length; i++) {
  btn[i].addEventListener("click", function () {
    var hinh = btn[i].parentElement.querySelector("div.card > div img").src;
    var ten = btn[i].parentElement.querySelector("div.card > h4").textContent;
    var gia = btn[i].parentElement.querySelector("div.card > input").value;
    var soluong = 1;
    var kttrung = 0;

    for (let j = 0; j < mang.length; j++) {
      if (mang[j]["ten"] == ten) {
        mang[j]["soluong"] += soluong;
        kttrung = 1;
        alert("Đã tăng số lượng trong giỏ hàng");
        break;
      }
    }

    if (kttrung == 0) {
      var sp = {
        hinh: hinh,
        ten: ten,
        gia: gia,
        soluong: soluong,
      };
      mang.push(sp);
    }
    console.log(mang);
    localStorage.setItem("cart", JSON.stringify(mang));
    getsoluongsp();
  });
}

var muaNgayBtn = document.getElementById("muaNgayBtn");
if (muaNgayBtn) {
  muaNgayBtn.addEventListener("click", function () {
    try {
      var hinh = document.querySelector(
        "div.container div:nth-child(1) img"
      ).src;
      var ten = document.querySelector(
        "div.container div:nth-child(2) h1"
      ).textContent;

      var giaInput = document.querySelector(
        "div.container div:nth-child(2) input[name='price']"
      );

      if (giaInput) {
        var gia = parseFloat(giaInput.value);
        var soluong = 1;
        var kttrung = 0;

        for (let i = 0; i < mang.length; i++) {
          if (mang[i]["ten"] == ten) {
            mang[i]["soluong"] += soluong;
            kttrung = 1;
            alert("Đã tăng số lượng trong giỏ hàng");
            break;
          }
        }

        if (kttrung == 0) {
          var sp = {
            hinh: hinh,
            ten: ten,
            gia: gia,
            soluong: soluong,
          };
          mang.push(sp);
        }

        console.log(mang);
        localStorage.setItem("cart", JSON.stringify(mang));
        getsoluongsp();
      } else {
        console.error("Không thể đọc giá sản phẩm. Phần tử không tồn tại.");
      }
    } catch (error) {
      console.error("Error when clicking 'Mua Ngay':", error);
    }
  });
}

function formatCurrency(value) {
  return value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
}

//Home page
function loaddatahome() {
  getsoluongsp();
  showproductnew();
}

//cart page
function loaddatacart() {
  getsoluongsp();
  showcart();
  total();
}
function showcart() {
  var cart = JSON.parse(localStorage.getItem("cart"));
  if (cart != null) {
    var kq = "";
    for (let i = 0; i < cart.length; i++) {
      kq +=
        '<tr>  <td><img src="' +
        cart[i]["hinh"] +
        '" height="80px">' +
        "<div>" +
        cart[i]["ten"] +
        "</div>" +
        "</td >   <td>" +
        formatCurrency(parseFloat(cart[i]["gia"])) + // Chuyển đổi giá thành số và định dạng
        '</td>    <td><button onclick="giam(this,' +
        i +
        ')">-</button><span>' +
        cart[i]["soluong"] +
        '</span><button onclick="tang(this,' +
        i +
        ')">+</button></td>  <td><button onclick="xoaSanPham(' +
        i +
        ')">Xóa</button></td></tr >';
    }
    document.getElementById("thongtingiohang").innerHTML = kq;
  }
}

function tang(x, i) {
  var td = x.parentElement;
  var sl = parseInt(td.childNodes[1].innerHTML);
  var slmoi = sl + 1;
  td.childNodes[1].innerHTML = slmoi;

  mang[i]["soluong"] = slmoi;
  localStorage.setItem("cart", JSON.stringify(mang));
  total();
}

function giam(x, i) {
  var td = x.parentElement;
  var sl = parseInt(td.childNodes[1].innerHTML);
  if (sl > 1) {
    var slmoi = sl - 1;
    td.childNodes[1].innerHTML = slmoi;
    mang[i]["soluong"] = slmoi;
    localStorage.setItem("cart", JSON.stringify(mang)); // Update localStorage with the latest cart data
    total();
  } else {
    alert("Số lượng không thể giảm nữa!");
  }
}

function total() {
  var cart = mang;
  if (cart != null) {
    var total = 0;
    for (let i = 0; i < cart.length; i++) {
      var tt = parseInt(cart[i]["gia"] * cart[i]["soluong"]);
      total += tt;
    }
    document.getElementById("tongdonhang").innerHTML =
      "Tổng đơn hàng: " + formatCurrency(total); // Sử dụng hàm formatCurrency ở đây
  }
}

function xoaSanPham(index) {
  var cart = JSON.parse(localStorage.getItem("cart"));

  if (cart != null && cart.length > index) {
    cart.splice(index, 1); // Xóa phần tử tại vị trí index
    localStorage.setItem("cart", JSON.stringify(cart)); // Cập nhật localStorage
    mang = cart; // Cập nhật biến mang với giỏ hàng mới
    showcart(); // Hiển thị giỏ hàng sau khi xóa
    total(); // Cập nhật tổng tiền
    getsoluongsp(); // Cập nhật số lượng sản phẩm trong giỏ hàng
  }
}

function getsoluongsp() {
  var cart = JSON.parse(localStorage.getItem("cart"));
  if (cart != null) {
    console.log(cart);
    document.getElementById("slsp").innerHTML = cart.length;
  }
}

function delcart() {
  localStorage.removeItem("cart");
  console.log("Cart removed");
  window.location = "product.html";
}
