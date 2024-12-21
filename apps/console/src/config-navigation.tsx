import { useMemo } from 'react';
import SvgColor from '@gc-broadcast-web/components/svg-color';
import Iconify from '@gc-broadcast-web/components/iconify';

// Helper function for icons

const icon = (name: string) => (
    <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
    // OR
    // <Iconify icon="fluent:mail-24-filled" />
    // https://icon-sets.iconify.design/solar/
    // https://www.streamlinehq.com/icons
);

const ICONS = {
    dashboard: icon('ic_dashboard'),
    items: <Iconify icon="ri:align-item-right-fill" />,
    purchaseOrder: <Iconify icon="material-symbols:order-approve" />,
    saleOrder: <Iconify icon="ic:sharp-sell" />,
    saleOrderRequest: <Iconify icon="icon-park-solid:buy" />,
};

// ----------------------------------------------------------------------

export function useNavData() {
    const data = useMemo(
        () => [
            // Overview
            {
                subheader: 'Overview',
                items: [
                    { title: 'Dashboard', path: '/dashboard', icon: ICONS.dashboard },
                ],
            },

            // Item Management
            {
                subheader: 'Item Management',
                items: [
                    { title: 'Items', path: '/items', icon: ICONS.items },
                    { title: 'Purchase Order', path: '/purchase-order', icon: ICONS.purchaseOrder },
                    { title: 'Sale Orders', path: '/sale-order', icon: ICONS.saleOrder },
                    { title: 'Sale Order Requests', path: '/sale-order-request', icon: ICONS.saleOrderRequest },
                ],
            },
        ],
        []
    );

    return data;
}
