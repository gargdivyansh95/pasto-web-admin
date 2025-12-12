import moment from 'moment';

export const formatTime = (createdAt) => {
    if (!createdAt?._seconds) return "-";
    const date = new Date(
        createdAt._seconds * 1000 + createdAt._nanoseconds / 1e6
    );
    return moment(date).format("hh:mm A");
};

export const formatDate = (createdAt) => {
    if (!createdAt?._seconds) return "-";

    const date = new Date(createdAt._seconds * 1000);
    return moment(date).format("DD/MM/YYYY");
};