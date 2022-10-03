import { toast } from 'react-toastify';

export const notify = (type, msg) => {
    if (type === 'success')
        toast.success(msg);
    else if (type === 'info')
        toast.info(msg);
    else if (type === 'warning')
        toast.warning(msg);
    else if (type === 'error')
        toast.error(msg);
};
