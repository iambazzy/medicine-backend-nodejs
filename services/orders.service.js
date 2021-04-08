const Order = require('../models/order.model'); 
const User = require('../models/user.model');
const { getUserIdFromToken, extractToken } = require('../Helpers/helpers');

exports.addOrder = async (orderData, headers) => {
  try {
    const token = extractToken(headers['authorization']);
    const userId = getUserIdFromToken(token);

    const user = await User.findById(userId, { orders: 1 });

    if(!user) {
      return { code: 400, message: 'No Orders Found' };
    }

    if (user.orders !== null) {
      const userOrders = await Order.updateOne(
        { _id: user.orders },
        { $push: { orders: orderData } },
        { new: true }
      );

      if (userOrders) {
        return { code: 200, message: 'Order Placed Successfully' };
      }

      return { code: 400, message: '[Error3] : Something Went Wrong While Placing Your Order' };

    } else {
      const order = await Order.create({ orders: orderData });

      if (order) {
        const ordersDocId = order._id;
        const updatedUser = await User.updateOne(
          { _id: userId },
          { orders: ordersDocId }
        );
        if (updatedUser) {
          return { code: 200, message: 'Order Placed Successfully' };
        } else {
          return { code: 400, message: '[Error1] : Something Went Wrong While Placing Your Order' };
        }
      } else {
        return { code: 400, message: '[Error2] : Something Went Wrong While Placing Your Order' };
      }
    }
  } catch(e) {
    throw Error(e);
  }
}

exports.getOrder = async (nop, headers) => {
  // Fetch all orders
  try {
    const token = extractToken(headers['authorization']);
    const userId = getUserIdFromToken(token);

    const user = await User.findById(userId, { orders: 1 });
    
    if (!user) {
      return { code: 400, message: 'No orders placed yet' };
    }

    if (user.orders !== null) {
      let orders = await Order.findOne({ _id: user.orders }, { orders: { $slice: [parseInt(nop), 2] } });      
      return { code: 200, message: 'Success', data: orders };
    } else {
      return { code: 400, message: 'No orders placed yet' };
    }

  } catch (e) {
    throw Error(e);
  }
}

