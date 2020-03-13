class FileControlle {
    async store(req, res) {
        return res.json({ ok: true });
    }
}
export default new FileControlle();
