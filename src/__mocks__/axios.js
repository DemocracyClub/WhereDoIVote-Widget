export default {
    get: jest.fn().mockResolvedValue({ data: {} }),
    defaults: {
        headers: {
            get: {
                'Content-Type': 'application/json',
            },
        },
    },
};
