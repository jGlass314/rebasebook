select uf.user_id_from, uf.user_id_to, uf.state, n.seen, n.created_at
--from users u
--join users_friendships uf_from on (u.id=uf_from.user_id_from)
--join users_friendships uf_to on (u.id=uf_to.user_id_to)
from notifications n
join notifications_friendships nf on (n.id=nf.notifications_id)
join users_friendships uf on (nf.friendships_id=uf.id);