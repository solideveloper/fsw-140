
use bobross;
select * from elements;

-- 1. SET Operations: I will use the set operator UNION to unify
-- like titled elements and display them in 1 new table:
select episode, title from elements where title like '%MOON%'
union 
select episode, title from elements where title like '%NIGHT%'
order by episode;

-- 2. Subqueries: or queries embedded in the WHERE clause of another query:
select * from elements
where episode in
	(select episode from elements where OCEAN = 1 and PALM_TREES = 1);
-- In the initial query we select from the elements table.  
-- Then in the subquery (within parenthesis) we return all episodes including ocean and palm_trees.
-- 9 rows are returned. 


-- 3. Order of Operations: following 7 sql query commands, 
-- I am asking for episodes that include night and moon; to be ordered and grouped by title ascending 

select title, night, moon
from elements
where night = 1
group by title
having moon = 1
order by title asc
limit 5;
-- When initially running this command I received a:
-- Error Code: 1055. Expression #3 of SELECT list is not in GROUP BY clause and 
-- contains nonaggregated column 'bobross.elements.MOON' 
-- which is not functionally dependent on columns in GROUP BY clause; 
-- this is incompatible with sql_mode=only_full_group_by
-- I fixed this error with the following command:
SET sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));

-- 4. Creating, altering, and dropping tables: 
create table favorite_elements like elements;
-- the above command creates new table called favorite_elements that mirrors the initial elements table via 'like'
select * from favorite_elements;
alter table favorite_elements add AIRBRUSH varchar(50) after title;
-- the above command alters the favorite_elements table to include a column titled AIRBRUSH
drop table favorite_elements;
-- the above command deletes the favorite_elements table.

-- 5. Associations: these tables are used for many:many relationships
-- I've recreated the previously dropped table and added columns including both 
-- the primary key (episode) and foreign keys like water and sun
create table favorite_elements 
as select episode, title, moon, clouds, waves
from elements;
alter table favorite_elements add water int not null;
alter table favorite_elements add sun int not null;
select * from favorite_elements;

-- 6. Joins and Multiple Table Joins:
select elements.episode, elements.title, favorite_elements.title, favorite_elements.moon, favorite_elements.clouds
from elements
inner join favorite_elements
on elements.episode = favorite_elements.episode
limit 50;









