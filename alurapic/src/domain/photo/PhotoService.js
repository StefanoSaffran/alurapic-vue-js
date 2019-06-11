export default class FotoService {

    constructor(resource) {

        this._resource = resource('v1/fotos{/id}');
    }

    register(photo) {

        if (!photo._id) return this._resource.save(photo);

        return this._resource.update({ id: photo._id }, photo);
    }

    list() {

        return this._resource
            .query()
            .then(res => res.json(),
                err => {
                    console.log(err);
                    throw new Error('Não foi possível obter as fotos. Tente mais tarde');
                }
            )
    }

    delete(id) {

        return this._resource.delete({ id })
            .then(null, err => {
                console.log(err);
                throw new Error('Não foi possível remover a foto. Tente mais tarde');
            });

    }

    search(id) {

        return this._resource
            .get({ id })
            .then(res => res.json());
    }
}