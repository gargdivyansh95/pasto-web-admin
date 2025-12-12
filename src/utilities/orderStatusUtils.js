export const getOrderStatus = (statusId = '') => {
  const map = {
    new_order: {
      title: 'New Order',
      color: '#007AFF',
    },
    preparing_order: {
      title: 'Preparing Order',
      color: '#FF9500',
    },
    out_for_delivery: {
      title: 'Out for Delivery',
      color: '#AF52DE',
    },
    ready_for_pickup: {
      title: 'Ready for Pickup',
      color: '#AF52DE',
    },
    completed_order: {
      title: 'Completed Order',
      color: '#34C759',
    },
    reject_order: {
      title: "Rejected Order",
      color: '#FF3B30',
    },
    cancel_order: {
      title: 'Cancelled Order',
      color: '#FF3B30',
    },
  };
  return map[statusId] || null;
};