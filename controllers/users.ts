import {Request, Response } from 'express';
import user from '../models/user';


export const getUsers = (req: Request, res: Response) => {
  user.find({})
    .then(user => res.send({data: user}))
    .catch(err => res.status(500).send({message: 'Произошла ошибка'}));
};

export const getUser = (req: Request, res: Response) => {
  user.findById(req.params.userId)
    .then(user => res.send({data: user}))
    .catch(err => res.status(500).send({message: 'Произошла ошибка'}));
};

export const createUser = (req: Request, res: Response) => {
  const {name, about, avatar} = req.body;

  user.create({name, about, avatar})
    .then(user => res.send({data: user}))
    .catch(err => res.status(500).send({message: 'Произошла ошибка'}));
};
