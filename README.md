# Description
This repository attempts to test how TypeORM deals with entity cascading.

The entities are `Parent` and `Child`, where a parent contains a list of children.

Three scenarios are tested:

## Scenarios
1. Creates a parent and attaches one child to it and store it in the database.
> Typeorm stores the parent and then stores the child pointing to the parent

2. With the same parent, add another child to the parent's list
> Typeorm stores the new child and updates the other child, since it got a new name

3. Delete that parent
> Typeorm deletes all of the attached children and then deletes the parent

For this to happen properly, the `ManyToOne` in the relationship must define what happens to it when the `OneToMany` of the relationship is updated and deleted, like so:

```typescript
@ManyToOne(() => Parent, (parent) => parent.children, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})
@JoinColumn({ name: 'parent_id' })
parent!: Parent;
```

# Requirements
- Docker
- Docker Compose

# How to run
```
$ docker-compose up --build
```

You can comment the regions from the bottom up to check what happens on each scenario.