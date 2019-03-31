
-- Triggers
CREATE OR REPLACE FUNCTION mustBe_petOwner()
RETURNS TRIGGER as $$
DECLARE count numeric; name text;
begin
SELECT COUNT (*) INTO count FROM petowners
WHERE NEW.oid = petowners.oid;
IF count > 0 THEN
RETURN NEW;
else
select users.name into name
from users
where users.id = new.oid;
insert into petowners values (new.oid, name, 'aaaa');
RETURN NEW;
END IF;
END;
$$ LANGUAGE plpgsql;

drop trigger if exists add_pets on pets;
create TRIGGER
add_pets
BEFORE INSERT OR UPDATE ON pets
FOR EACH ROW
EXECUTE PROCEDURE mustBe_petOwner();
