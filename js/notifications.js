/**
 * Pusat Arsip Anka - Notification System
 * Handles real-time indicators and unread archive notifications
 */

const NotificationSystem = {
    unreadCount: 0,
    isOpen: false,

    init() {
        this.checkNotifications();
        // Periodically check for new notifications (e.g., every 2 minutes)
        setInterval(() => this.checkNotifications(), 120000);

        // Close on click outside
        document.addEventListener('click', (e) => {
            if (this.isOpen && !e.target.closest('#notification-dropdown')) {
                this.toggle(false);
            }
        });
    },

    async checkNotifications() {
        try {
            // Sources: Unread archives
            const { data: archives, error } = await _supabase
                .from('archives')
                .select('id, store_name, status, created_at')
                .eq('status', 'Unread')
                .order('created_at', { ascending: false });

            if (error) throw error;

            this.unreadCount = archives ? archives.length : 0;
            this.updateBadge();
            this.renderList(archives || []);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    },

    updateBadge() {
        const badge = document.getElementById('notification-badge');
        if (!badge) return;

        if (this.unreadCount > 0) {
            badge.classList.add('active');
        } else {
            badge.classList.remove('active');
        }
    },

    toggle(force) {
        const menu = document.getElementById('notification-menu');
        if (!menu) return;

        this.isOpen = force !== undefined ? force : !this.isOpen;

        if (this.isOpen) {
            menu.classList.add('active');
        } else {
            menu.classList.remove('active');
        }
    },

    renderList(notifications) {
        const list = document.getElementById('notification-list');
        if (!list) return;

        if (notifications.length === 0) {
            list.innerHTML = `
                <div class="px-4 py-8 text-center text-gray-400 italic">
                    <p class="text-xs">Tidak ada notifikasi baru</p>
                </div>
            `;
            return;
        }

        list.innerHTML = notifications.map(notif => `
            <div class="px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-50/50 cursor-pointer group" onclick="viewNotification('${notif.id}')">
                <div class="flex items-start gap-3">
                    <div class="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-xs font-bold text-gray-900 truncate">Arsip Baru: ${notif.store_name}</p>
                        <p class="text-[10px] text-gray-400 mt-0.5 italic truncate">${new Date(notif.created_at).toLocaleString('id-ID')}</p>
                    </div>
                </div>
            </div>
        `).join('');
    }
};

// Global hooks
window.toggleNotifications = () => NotificationSystem.toggle();
window.markAllAsRead = async () => {
    try {
        const { error } = await _supabase
            .from('archives')
            .update({ status: 'Read' })
            .eq('status', 'Unread');

        if (error) throw error;

        NotificationSystem.checkNotifications();
        if (typeof Toast !== 'undefined') Toast.success('Semua notifikasi ditandai sudah dibaca');
    } catch (error) {
        console.error('Error marking read:', error);
    }
};

window.viewNotification = (id) => {
    // Redirect or open specific view
    window.location.href = `history.html?id=${id}`;
};

// Initialize
document.addEventListener('DOMContentLoaded', () => NotificationSystem.init());
