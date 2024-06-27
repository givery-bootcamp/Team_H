package usecases

import (
	"myapp/internal/entities"
	"myapp/internal/interfaces"
)

type PostUsecase struct {
	repository interfaces.PostRepository
}

func NewPostUsecase(r interfaces.PostRepository) *PostUsecase {
	return &PostUsecase{
		repository: r,
	}
}

func (u *PostUsecase) GetList(limit int, offset int) (
	[]*entities.Post, error) {
	return u.repository.List(nil, limit, offset)
}

func (u *PostUsecase) Get(id int) (*entities.Post, error) {
	return u.repository.Get(id)
}

func (u *PostUsecase) Create(title, body string, userId int) (*entities.Post, error) {
	return u.repository.Create(title, body, userId)
}

func (u *PostUsecase) Update(title, body string, userId, postId int) (*entities.Post, error) {
	return u.repository.Update(title, body, userId, postId)
}

func (u *PostUsecase) Delete(id int) error {
	return u.repository.Delete(id)
}
