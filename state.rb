class State
  include DataMapper::Resource

  property :id, Serial
  property :temp, Integer
  property :power, Boolean

end
